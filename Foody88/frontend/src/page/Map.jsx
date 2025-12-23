import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography, Alert, CircularProgress, Stack, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getStores } from '../api/api';
import DirectionsIcon from '@mui/icons-material/Directions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Fix lỗi icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Icon nhà hàng
const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
});

// Icon người dùng
const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
});

const DEFAULT_CENTER = { lat: 21.028511, lng: 105.804817 };
const CONTAINER_STYLE = { height: '600px', width: '100%' };

// Component điều khiển map
const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center?.lat && center?.lng) {
            map.setView(center, map.getZoom() || 14);
        }
    }, [center, map]);
    return null;
};

const MapComponent = () => {
    const [position, setPosition] = useState(DEFAULT_CENTER);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stores, setStores] = useState([]);
    const location = useLocation(); // Hook để lấy thông tin URL

    useEffect(() => {
        const initializeMap = async () => {
            setLoading(true);

            const searchParams = new URLSearchParams(location.search);
            const latFromQuery = searchParams.get('lat');
            const lngFromQuery = searchParams.get('lng');

            let locationPromise;

            // Ưu tiên vị trí từ URL
            if (latFromQuery && lngFromQuery) {
                const targetPosition = { lat: Number(latFromQuery), lng: Number(lngFromQuery) };
                setPosition(targetPosition);
                locationPromise = Promise.resolve(targetPosition); // Tạo một promise đã hoàn thành
            } else {
                // Nếu không có, lấy vị trí người dùng
                locationPromise = new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error('このブラウザはジオロケーションをサポートしていません'));
                    } else {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                            (err) => reject(err)
                        );
                    }
                });
            }

            // Chạy song song API và Geolocation
            const results = await Promise.allSettled([
                getStores(),
                locationPromise
            ]);

            const [storesResult, locationResult] = results;

            // Xử lý dữ liệu Stores
            if (storesResult.status === 'fulfilled') {
                try {
                    const response = storesResult.value;
                    let rawList = [];

                    // Tự động phát hiện cấu trúc dữ liệu
                    if (response.data && Array.isArray(response.data)) {
                        rawList = response.data;
                    } else if (Array.isArray(response)) {
                        rawList = response;
                    } else if (response.data && typeof response.data === 'object') {
                        rawList = Object.values(response.data).flatMap(city => city.items || []);
                    }

                    // Map dữ liệu và ép kiểu số an toàn
                    const processedStores = rawList.map(store => ({
                        ...store,
                        lat: Number(store.lat || store.latitude || store.Latitude), 
                        lng: Number(store.lng || store.longitude || store.Longitude)
                    })).filter(s => s.lat && s.lng && !isNaN(s.lat) && !isNaN(s.lng));

                    setStores(processedStores);
                } catch (err) {
                    console.error("Lỗi xử lý dữ liệu store:", err);
                }
            }

            // Xử lý vị trí người dùng
            if (locationResult.status === 'fulfilled') {
                // Chỉ cập nhật nếu không có vị trí từ URL
                if (!latFromQuery) setPosition(locationResult.value);
            } else {
                if (!latFromQuery) setError('位置情報の取得に失敗しました (Lỗi lấy vị trí).');
            }

            setLoading(false);
        };

        initializeMap();
    }, [location.search]);
return (
        <Box sx={{ p: 3, bgcolor: '#f8eecbff', flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
                レストランマップ
            </Typography>
            
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>地図とデータを読み込み中...</Typography>
                </Box>
            ) : (
                <MapContainer
                    center={position}
                    zoom={14}
                    scrollWheelZoom={true}
                    style={CONTAINER_STYLE}
                >
                    <TileLayer
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <MapController center={position} />

                    <Marker position={position} icon={userIcon}>
                        <Popup>あなたの現在地</Popup>
                    </Marker>

                    {stores.map((store) => (
                        <Marker 
                            key={store.id} 
                            position={[store.lat, store.lng]} 
                            icon={restaurantIcon}
                        >
                            <Popup>
                                {/* Tăng minWidth để nút không bị chèn ép */}
                                <Box sx={{ minWidth: '220px' }}> 
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '15px' }}>
                                        {store.name}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ mb: 1.5, color: '#555' }}>
                                        {store.address}
                                    </Typography>

                                    {/* Dùng Stack để dàn hàng ngang 2 nút */}
                                    <Stack direction="row" spacing={1}>
                                        {/* Nút 1: Chỉ đường */}
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            startIcon={<DirectionsIcon />}
                                            // Link chuẩn của Google Maps Directions
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                textTransform: 'none', 
                                                flex: 1, // Chia đều độ rộng
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            道順
                                        </Button>

                                        {/* Nút 2: Chi tiết */}
                                        <Button 
                                            component={RouterLink}
                                            to={`/store/${store.id}`} 
                                            variant="outlined" // Để cùng loại outlined cho đồng bộ
                                            size="small"
                                            startIcon={<InfoOutlinedIcon />} // Thêm icon nếu muốn cân đối
                                            sx={{ 
                                                textTransform: 'none',
                                                flex: 1, // Chia đều độ rộng
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            詳細
                                        </Button>
                                    </Stack>
                                </Box>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </Box>
    );
};

export default MapComponent;