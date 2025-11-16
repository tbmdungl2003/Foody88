import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card,  CardContent, Link, Avatar, CircularProgress, Alert } from '@mui/material';
import { 
    // LocationOn as LocationOnIcon, // Không dùng nữa, thay bằng Select
    Image as ImageIcon // Import icon Image cho placeholder
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getFoods } from '../api/api'; // Import hàm gọi API
import SearchComponent from '../components/SearchComponent'; 
// import SpinWheel from '../components/SpinWheel';

const Dashboard = () => {
    const [location, setLocation] = useState('Ha Noi'); // 'Ha Noi' là key
    const [searchTerm, setSearchTerm] = useState(''); // State mới cho thanh tìm kiếm
    const [foodData, setFoodData] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const response = await getFoods();
                setFoodData(response.data);
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

    // Logic tìm kiếm và lọc món ăn
    const displayedItems = React.useMemo(() => {
        // Nếu có từ khóa tìm kiếm, tìm trên tất cả các thành phố
        if (searchTerm.trim() !== '') {
            const allItems = Object.values(foodData).flatMap(locationData => locationData.items);
            return allItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // Nếu không, hiển thị món ăn theo thành phố đã chọn
        return foodData[location]?.items || [];
    }, [searchTerm, location, foodData]);

    // Biến này không còn được sử dụng trực tiếp, thay bằng `displayedItems`
    // const foodItems = foodData[location]?.items || [];

    return (
        <>
            {/* <SpinWheel foodItems={foodItems} /> */}
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

                    {/* Thanh Tìm kiếm (Vị trí 7, 8) - Giữ nguyên */}
                    <SearchComponent 
                        foodData={foodData}
                        location={location}
                        onLocationChange={setLocation}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    {/* Vị trí 9: Khu vực hiển thị Hình ảnh lớn/Banner */}
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

                    {/* Danh sách các món ăn (Vị trí 10, 11, 12, 13) */}
                    {/* Grid container spacing={4} và md={4} đã đảm bảo 3 card chia đều trên màn hình lớn */}
                    <Grid container spacing={4}>
                        {displayedItems.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4}> 
                                {/* 👈 md={4} đảm bảo 3 card chia đều (4+4+4=12) */}
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                    
                                    {/* 10. Ảnh món ăn (Placeholder theo Form mẫu) */}
                                    <Box 
                                        sx={{ 
                                            // Vị trí Placeholder ảnh
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
                                        // Padding dọc nhỏ lại để dồn nội dung
                                        py: 1, 
                                        pb: '0 !important',
                                    }}>
                                        {/* 11. Tên món ăn (Làm to lên một chút) */}
                                        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </Typography>
                                        
                                        {/* 12. Link xem chi tiết */}
                                        <Link component={RouterLink} to={`/details/${item.id}`} variant="body2" sx={{ 
                                            color: 'primary.main', 
                                            textDecoration: 'none', 
                                            display: 'block', 
                                            mb: 1 // Khoảng cách bên dưới link
                                        }}>
                                            もっと見る (Xem chi tiết)
                                        </Link>
                                    </CardContent>
                                    
                                    {/* 13. Khu vực comment/like/date */}
                                    <Box sx={{ 
                                        mt: 2, 
                                        borderTop: '1px solid #eee', 
                                        pt: 1, 
                                        p: 2, // Thêm padding để card trông lớn hơn
                                    }}>
                                        <Typography variant="body2" color="text.secondary">コメント (Comment)</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main', fontSize: '0.8rem' }}>{item.comments[0]}</Avatar>
                                            <Typography variant="body2" sx={{ flexGrow: 1 }}>{item.comments}さん</Typography>
                                            <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                                        </Box>
                                        
                                        <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>Reply • Likes</Typography>
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