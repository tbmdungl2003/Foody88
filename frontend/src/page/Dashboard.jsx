import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card,  CardContent, Link, CircularProgress, Alert, Avatar } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getFoods } from '../api/api'; // Import hàm gọi API
import SearchComponent from '../components/SearchComponent'; 
// import SpinWheel from '../components/SpinWheel';

const Dashboard = () => {
    const [location, setLocation] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [foodData, setFoodData] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const response = await getFoods();
                setFoodData(response.data); // Sửa lại: Chỉ lấy thuộc tính 'data' từ response
                setError(null);
            } catch (err) {
                setError("Không thể tải dữ liệu món ăn.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []); // Chỉ chạy một lần khi component được mount

    const displayedItems = React.useMemo(() => {
        let itemsToDisplay = [];

        if (location === 'all') {
            itemsToDisplay = Object.values(foodData).flatMap(locationData => locationData?.items || []);
        } else {
            itemsToDisplay = foodData[location]?.items || [];
        }

        if (searchTerm.trim() !== '') {
            return itemsToDisplay.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return itemsToDisplay;
    }, [searchTerm, location, foodData]);

    const handleLocationChange = ( newLocation) => {
        setLocation(newLocation);
        setSearchTerm(''); 
    };

    return (
        <>
            {/* <SpinWheel foodItems={displayedItems} onFoodSelected={handleFoodSelected} /> */}
            
                <Container 
                    component="main" 
                    maxWidth="lg" 
                     sx={{ 
                         py: 4, 
                        flexGrow: 1,
                         px: { xs: 2, md: 0 } 
                    }}>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                            <Typography sx={{ ml: 2 }}>Đang tải dữ liệu...</Typography>
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 4 }}>
                            {error}
                        </Alert>
                    )}


                    <SearchComponent 
                        foodData={foodData}
                        location={location}
                        onLocationChange={handleLocationChange}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    {searchTerm && (
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Kết quả tìm kiếm cho: "{searchTerm}"
                        </Typography>
                    )}

                    <Box 
                        sx={{ 
                            height: 150, // 👈 Đã giảm chiều cao Banner
                            backgroundColor: '#ccc', 
                            mb: 4, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: 5 // Bo góc nhẹ
                        }}
                    >
                        <Typography variant="h5" color="text.secondary">画像 (Hình ảnh/Banner)</Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {displayedItems.map((item) => (
                            <Grid item key={item._id} xs={12} sm={6} md={4}> 
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                    <Box 
                                        sx={{ 
                                            pt: '56.25%', // Giữ tỷ lệ 16:9 cho ảnh
                                            backgroundColor: '#f0f0f0', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            position: 'relative',
                                        }}
                                    >
                                        <ImageIcon sx={{ position: 'absolute', fontSize: 60, color: '#bdbdbd' }} />
                                    </Box>

                                    <CardContent sx={{ 
                                        flexGrow: 1, 
                                        py: 1, 
                                        pb: '0 !important',
                                    }}>
                                        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </Typography>
                                        
                                        <Link component={RouterLink} to={`/details/${item._id}`} variant="body2" sx={{ 
                                            color: 'primary.main', 
                                            textDecoration: 'none', 
                                            display: 'block', 
                                            mb: 1 
                                        }}>
                                            もっと見る 
                                        </Link>
                                    </CardContent>
                                    
                                    <Box sx={{ 
                                        mt: 'auto', 
                                        borderTop: '1px solid #eee', 
                                        pt: 1, 
                                        p: 2,
                                    }}>
                                        <Typography variant="body2" color="text.secondary">コメント (Comment)</Typography>
                                        {/* Liên kết đến trang bình luận */}
                                        {item.comments && item.comments.length > 0 ? (
                                            <Link component={RouterLink} to={`/comments/${item._id}`} sx={{ textDecoration: 'none' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                                    {/* Hiển thị avatar của người bình luận đầu tiên */}
                                                    <Avatar src={item.comments[0].avatar} sx={{ width: 28, height: 28 }} />
                                                    <Typography variant="body2" color="text.primary">
                                                        <strong>{item.comments[0].user}</strong> và {item.comments.length - 1} người khác đã bình luận
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        ) : (
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic' }}>Chưa có bình luận nào</Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
         </>
    );
};

export default Dashboard;