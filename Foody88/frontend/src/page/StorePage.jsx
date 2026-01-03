import React, { useRef, useEffect, useState } from "react";
import { getFoods, getStoreById } from "../api/api"; // API
import { Link as RouterLink, useParams } from "react-router-dom"; // Routing
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function StorePage() {

  const menuRef = useRef(null);
  const { id: storeId } = useParams();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const storeRes = await getStoreById(storeId);
        const currentStore = storeRes.data;
        setStore(currentStore);
        const foodsRes = await getFoods();
        const cities = Object.values(foodsRes.data);
        const allFoods = cities.flatMap(city => city.items || []);
        const filteredFoods = allFoods.filter(food => food.address === currentStore.address);

        setFoods(filteredFoods);

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang cửa hàng:", error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Đang tải thông tin cửa hàng...</Typography>
      </Box>
    );
  }

  if (!store) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h5">Không tìm thấy thông tin cửa hàng.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#f8eecbff" }}>
      <Paper 
        elevation={1} 
        sx={{ 
          background: "white",
          minHeight: '45vh', 
          display: 'flex',    
          alignItems: 'center',
          pt: 8, 
          pb: 8  
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center"> 
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                component="img"
                sx={{ 
                    width:  { xs: 300, md: 300 }, 
                    height: { xs: 300, md: 300 }, 
                    borderRadius: 4,
                    objectFit: 'cover',
                    boxShadow: 3 
                }}
                image={store.image}
                alt={store.name}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {store.name}
              </Typography>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                  <strong>住所:</strong> {store.address}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                  <strong>営業時間:</strong> {store.open}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                {store.description}
              </Typography>

              {/* Nút xem trên bản đồ */}
              <Button
                component={RouterLink}
                to={`/map?lat=${store.lat}&lng=${store.lng}`}
                variant="outlined"
                startIcon={<MapIcon />}
                sx={{ mt: 3 }}
              >
                地図で見る
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container maxWidth="lg" sx={{ py: 6, mt: 4, position: "relative" }}>
        <Typography 
            variant="h4" 
            sx={{ mb: 4, fontWeight: 'bold', borderLeft: '5px solid #1976d2', pl: 2 }}
        >
            Menu
        </Typography>
        
        <Box
          ref={menuRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
            pb: 4,
            scrollBehavior: "smooth",
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {foods.map((item) => (
            <Card key={item._id} sx={{ flex: "0 0 260px", boxShadow: 3, borderRadius: 2 }}>
              <RouterLink to={`/details/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="180" 
                  image={item.image || 'https://via.placeholder.com/260x180'}
                  alt={item.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {item.price}
                  </Typography>
                </CardContent>
              </RouterLink>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: { xs: 0, lg: -25 },
            top: "60%", // Điều chỉnh vị trí nút scroll
            transform: "translateY(-50%)",
            bgcolor: 'primary.main',
            color: 'white',
            width: 48,
            height: 48,
            boxShadow: 3,
            '&:hover': { bgcolor: 'primary.dark' },
            zIndex: 2,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Container>
    </Box>
  );
}

export default StorePage;