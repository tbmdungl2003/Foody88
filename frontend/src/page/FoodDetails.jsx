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
    Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getFoodById } from '../api/api';

const FoodDetails = () => {
    const { id } = useParams(); 
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cuộn lên đầu trang khi component được tải
        window.scrollTo(0, 0);

        const fetchFoodDetails = async () => {
            try {
                setLoading(true);
                const response = await getFoodById(id);
                setFood(response.data);
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
            <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                Quay lại danh sách
            </Button>
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
                            <Typography>{food.address || 'Chưa có thông tin địa chỉ.'}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default FoodDetails;