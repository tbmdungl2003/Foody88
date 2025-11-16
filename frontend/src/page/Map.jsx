import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css'; // **RẤT QUAN TRỌNG: Import CSS của Leaflet**

// Fix marker icon (Leaflet cần các đường dẫn tĩnh cho marker)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Vị trí mặc định (Ví dụ: Hà Nội)
const DEFAULT_CENTER = {
    lat: 21.028511,
    lng: 105.804817
};

// Style cho MapContainer
const CONTAINER_STYLE = {
    height: '600px',
    width: '100%'
}

// Component con để điều khiển bản đồ
const MapController = ({ center }) => {
    const map = useMap(); // Hook để truy cập instance của bản đồ
    
    // Khi vị trí thay đổi, di chuyển bản đồ đến vị trí mới
    useEffect(() => {
        if (center.lat && center.lng) {
            map.setView(center, 16); // Di chuyển và phóng to (zoom level 16)
        }
    }, [center, map]);

    return null;
};

const MapComponent = () => {
    const [position, setPosition] = useState(DEFAULT_CENTER);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------------------
    // Lấy vị trí hiện tại của người dùng bằng navigator.geolocation
    // ----------------------------------------------------
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation không được hỗ trợ bởi trình duyệt này.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setPosition(newPos);
                setLoading(false);
            },
            (err) => {
                let errorMessage = `Lỗi Geolocation: ${err.message}. Sử dụng vị trí mặc định.`;
                if (err.code === 1) {
                    errorMessage = 'Bạn đã từ chối cấp quyền chia sẻ vị trí. Sử dụng vị trí mặc định.';
                }
                setError(errorMessage);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }, []); // Chỉ chạy một lần khi component mount

    // ----------------------------------------------------
    // Phần Hiển thị (Render)
    // ----------------------------------------------------

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Bản Đồ Vị Trí Hiện Tại </Typography>
            
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Đang tìm vị trí của bạn...</Typography>
                </Box>
            ) : (
                <MapContainer
                    center={position} // Sử dụng vị trí hiện tại (hoặc mặc định nếu lỗi)
                    zoom={14} 
                    scrollWheelZoom={false}
                    style={CONTAINER_STYLE}
                >
                    {/* 1. Lớp dữ liệu bản đồ (TileLayer) từ OpenStreetMap */}
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL API của OSM
                    />
                    
                    {/* Component để điều khiển việc di chuyển bản đồ */}
                    <MapController center={position} />
                    
                    {/* 2. Marker hiển thị vị trí người dùng */}
                    {position.lat && position.lng && (
                        <Marker position={position} title="Vị trí của tôi" />
                    )}

                </MapContainer>
            )}
        </Box>
    );
};

export default MapComponent;