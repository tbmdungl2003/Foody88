import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    CircularProgress, 
    Alert, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent,
    Button,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getFoodById, getStores } from '../api/api';

const FoodDetails = () => {
    const { id } = useParams(); 
    const [food, setFood] = useState(null);
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cuộn lên đầu trang khi component được tải
        window.scrollTo(0, 0);

        const fetchFoodDetails = async () => {
            try {
                setLoading(true);
                // Tải thông tin món ăn và danh sách cửa hàng cùng lúc
                const [foodRes, storesRes] = await Promise.all([
                    getFoodById(id),
                    getStores()
                ]);
                const currentFood = foodRes.data;
                setFood(currentFood);

                // Logic tìm cửa hàng thông minh hơn
                const storesData = storesRes.data;
                let allStores = [];
                if (Array.isArray(storesData)) {
                    // Nếu dữ liệu đã là một mảng
                    allStores = storesData;
                } else if (typeof storesData === 'object' && storesData !== null) {
                    // Nếu dữ liệu là object nhóm theo thành phố
                    allStores = Object.values(storesData).flatMap(city => city.items || []);
                }

                // Tìm cửa hàng có địa chỉ khớp
                const foundStore = allStores.find(s => s.address.trim() === currentFood.address.trim());

                setStore(foundStore);

                setError(null);
            } catch (err) {
                setError('Không thể tải thông tin chi tiết món ăn. Vui lòng thử lại.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]); 

    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Đang tải chi tiết món ăn...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                    Quay về trang chủ
                </Button>   
            </Container>
        );
    }

    if (!food) {
        return null; 
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Card sx={{ boxShadow: 3 }}>
                <Grid container>
                    {/* Cột ảnh */}
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            image={food.image || 'https://via.placeholder.com/600x400.png?text=Foody88'} // Ảnh mặc định
                            alt={food.name}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Grid>
                    {/* Cột thông tin */}
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {food.name}
                            </Typography>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                {food.price || 'Đang cập nhật giá'}
                            </Typography>
                            {/* Hiển thị mô tả và địa chỉ trực tiếp */}
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Mô tả</Typography>
                            <Typography paragraph>{food.description || 'Chưa có mô tả cho món ăn này.'}</Typography>
                            <Typography variant="h6" gutterBottom sx={{mt: 2}}>Địa chỉ</Typography>
                            <Typography paragraph>{food.address || 'Chưa có thông tin địa chỉ.'}</Typography>

                            {/* Hiển thị thông tin nhà hàng */}
                            {store && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography variant="h6" gutterBottom>Nhà hàng</Typography>
                                    <Typography paragraph>
                                        <strong>{store.name}</strong>
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        to={`/store/${store.id}`}
                                        variant="contained"
                                        startIcon={<StorefrontIcon />}
                                    >
                                        Xem Menu Nhà Hàng
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default FoodDetails;