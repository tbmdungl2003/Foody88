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
    Divider,
    Box
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
                const [foodRes, storesRes] = await Promise.all([
                    getFoodById(id),
                    getStores()
                ]);
                const currentFood = foodRes.data;
                setFood(currentFood);
                const storesData = storesRes.data;
                let allStores = [];
                if (Array.isArray(storesData)) {
                    allStores = storesData;
                } else if (typeof storesData === 'object' && storesData !== null) {
                    allStores = Object.values(storesData).flatMap(city => city.items || []);
                }
                const foundStore = allStores.find(s => s.address.trim() === currentFood.address.trim());

                setStore(foundStore);

                setError(null);
            } catch (err) {
                setError('料理の詳細を読み込めませんでした。もう一度お試しください。');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]); 

    if (loading) {
        return (
            <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: 4 }}>
                <Container sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2 }}>料理の詳細を読み込み中...</Typography>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: 4 }}>
                <Container>
                    <Alert severity="error">{error}</Alert>
                    <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                        ホームに戻る
                    </Button>   
                </Container>
            </Box>
        );
    }

    if (!food) {
        return null; 
    }

    return (
        <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
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
                                {food.price || '価格更新中'}
                            </Typography>
                            {/* Hiển thị mô tả và địa chỉ trực tiếp */}
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>説明</Typography>
                            <Typography paragraph>{food.description || 'この料理の説明はまだありません。'}</Typography>
                            <Typography variant="h6" gutterBottom sx={{mt: 2}}>住所</Typography>
                            <Typography paragraph>{food.address || '住所情報はありません。'}</Typography>

                            {/* Hiển thị thông tin nhà hàng */}
                            {store && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography variant="h6" gutterBottom>レストラン</Typography>
                                    <Typography paragraph>
                                        <strong>{store.name}</strong>
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        to={`/store/${store.id}`}
                                        variant="contained"
                                        startIcon={<StorefrontIcon />}
                                    >
                                        レストランのメニューを見る
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            </Container>
        </Box>
    );
};

export default FoodDetails;