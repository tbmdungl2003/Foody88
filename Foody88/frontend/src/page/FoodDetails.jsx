import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink, Navigate } from 'react-router-dom';
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
import { AuthContext } from '../context/AuthContext';

const FoodDetails = () => {
    const { id } = useParams(); 
    const { auth } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
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

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

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
        <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: { xs: 4, md: 7 } }}>
            <Container maxWidth="lg">
                <Card sx={{ boxShadow: 3, overflow: 'hidden' }}>
                    <Grid container>
                        
                        {/* --- CỘT ẢNH (Bên trái, nhỏ lại) --- */}
                        {/* xs={4}: Trên mobile chiếm 4/12 cột (khoảng 33%) */}
                        {/* md={3}: Trên desktop chiếm 3/12 cột (25%) - Gần với tỷ lệ 3 phần bạn muốn */}
                        <Grid item xs={12} md={3}> 
                            <CardMedia
                                component="img"
                                image={food.image || 'https://via.placeholder.com/600x400.png?text=Foody88'}
                                alt={food.name}
                                sx={{ 
                                    width: '100%', 
                                    height: '100%', // Kéo dãn chiều cao bằng cột bên phải
                                    // objectFit: 'cover' QUAN TRỌNG: Cắt ảnh để lấp đầy khung mà không bị méo
                                    objectFit: 'cover', 
                                    minHeight: {xs: '250px', md: 'auto'} // Đảm bảo chiều cao tối thiểu trên mobile
                                }}
                            />
                        </Grid>

                        {/* --- CỘT THÔNG TIN (Bên phải, rộng ra) --- */}
                        {/* xs={8}: Phần còn lại trên mobile */}
                        {/* md={9}: Phần còn lại trên desktop (75%) - Gần với tỷ lệ 7 phần bạn muốn */}
                        <Grid item xs={12} md={9}>
                            <CardContent sx={{ 
                                p: { xs: 2, md: 4 }, 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column' 
                            }}>
                                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '2.125rem' } }}>
                                    {food.name}
                                </Typography>
                                <Typography variant="h6" color="primary.main" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                    {food.price || '価格更新中'}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>説明</Typography>
                                <Typography variant="body2" paragraph color="text.secondary">
                                    {food.description || 'この料理の説明はまだありません。'}
                                </Typography>

                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>住所</Typography>
                                <Typography variant="body2" paragraph color="text.secondary">
                                    {food.address || '住所情報はありません。'}
                                </Typography>

                                {store && (
                                    <Box sx={{ mt: 'auto', pt: 2 }}>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>レストラン</Typography>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            {store.name}
                                        </Typography>
                                        <Button
                                            component={RouterLink}
                                            to={`/store/${store.id}`}
                                            variant="contained"
                                            startIcon={<StorefrontIcon />}
                                            size="small"
                                            sx={{ textTransform: 'none', width: 'fit-content' }}
                                        >
                                            メニューを見る
                                        </Button>
                                    </Box>
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