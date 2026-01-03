import React, { useState, useEffect, useMemo, useContext } from 'react';
import { 
  Box, Typography, Container, Card, CardMedia, CardContent, 
  Link, CircularProgress, Alert, Avatar, Button, IconButton
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getFoods, getStores } from '../api/api'; 
import SearchComponent from '../components/SearchComponent'; 
import { AuthContext } from '../context/AuthContext';
import SpinWheel from '../components/SpinWheel';
const redBrown = '#B33A3A';


const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [location, setLocation] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [foodData, setFoodData] = useState({});
    const [stores, setStores] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [initialFavorites, setInitialFavorites] = useState([]); 

    useEffect(() => {
        if (auth.user && (auth.user.role === 'admin' || auth.user.role === 'Admin')) {
            navigate('/admin/dashboard');
        }
    }, [auth.user, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [foodsRes, storesRes] = await Promise.all([getFoods(), getStores()]);
                const rawData = foodsRes.data;
                const processedData = {};

                if (rawData && typeof rawData === 'object') {
                    Object.keys(rawData).forEach(key => {
                        const group = rawData[key];
                        if (group && Array.isArray(group.items)) {
                            const itemsWithLocalComments = group.items.map(item => {
                                const localComments = JSON.parse(localStorage.getItem(`comments_${item._id}`) || '[]');
                                const apiComments = item.comments || [];
                                return { ...item, comments: [...localComments, ...apiComments] };
                            });
                            processedData[key] = { ...group, items: itemsWithLocalComments };
                        } else {
                            processedData[key] = group;
                        }
                    });
                    setFoodData(processedData);
                } else {
                    setFoodData(rawData);
                }

                setStores(storesRes.data);
                setError(null);

                const storedFavs = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
                setFavorites(storedFavs);
                setInitialFavorites(storedFavs);
            } catch (err) {
                setError("データを読み込めませんでした。");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); 

    const handleToggleFavorite = (e, id) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        const currentFavs = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
        let newFavs;
        if (currentFavs.includes(id)) {
            newFavs = currentFavs.filter(favId => favId !== id);
        } else {
            newFavs = [...currentFavs, id];
        }
        localStorage.setItem('favoriteFoods', JSON.stringify(newFavs));
        setFavorites(newFavs);
    };

    const displayedStores = useMemo(() => {
        if (!stores || stores.length === 0) {
            return [];
        }
        if (location === 'all') {
            return stores; 
        }

        const locationName = foodData[location]?.name;
        return locationName ? stores.filter(store => store.address && store.address.includes(locationName)) : stores;
    }, [stores, location, foodData]);

    const displayedItems = useMemo(() => {
        let itemsToDisplay = [];
        if (location === 'all') {
            itemsToDisplay = Object.values(foodData).flatMap(city => city?.items || []);
        } else {
            itemsToDisplay = foodData[location]?.items || [];
        }
        if (searchTerm.trim() !== '') {
            itemsToDisplay = itemsToDisplay.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        return [...itemsToDisplay].sort((a, b) => {
            const isFavA = initialFavorites.includes(a._id);
            const isFavB = initialFavorites.includes(b._id);
            if (isFavA && !isFavB) return -1;
            if (!isFavA && isFavB) return 1;
            return 0;
        });
    }, [searchTerm, location, foodData, initialFavorites]);

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        setSearchTerm(''); 
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ py: 4, flexGrow: 1, backgroundColor: '#f8eecbff' }}>
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /><Typography sx={{ ml: 2 }}>読み込み中...</Typography></Box>}
            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

            <SearchComponent 
                foodData={foodData} location={location} onLocationChange={handleLocationChange}
                searchTerm={searchTerm} onSearchChange={setSearchTerm}
            />

            {searchTerm && <Typography variant="h5" sx={{ mb: 3 }}>検索結果: "{searchTerm}"</Typography>}

                <Box sx={{ 
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 6,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                }}>
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Banner ẩm thực Foody88"
                        sx={{
                            width: '100%',
                            height: { xs: '300px', md: '400px' },
                            objectFit: 'cover',
                            filter: 'brightness(0.6)', 
                        }}
                    />
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        p: 3,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' 
                    }}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: '900', mb: 2, letterSpacing: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            グルメの世界を発見
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '900px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            情熱を分かち合い、新しいレシピを発見し、活気あるフードコミュニティに参加しましょう。
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large"
                            component={RouterLink} 
                            to="/map" 
                            sx={{ 
                                bgcolor: redBrown,
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                boxShadow: '0 4px 15px rgba(179, 58, 58, 0.5)',
                                '&:hover': { bgcolor: '#8E2E2E', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(179, 58, 58, 0.6)' },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            近くを検索
                        </Button>
                    </Box>
                </Box>

            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', borderLeft: '5px solid #1976d2', pl: 2 }}>
                    おすすめのレストラン
                </Typography>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3
                }}>
                    {displayedStores.map((store) => ( 
                        <Link key={store.id} component={RouterLink} to={`/store/${store.id}`} sx={{ textDecoration: 'none' }}>
                            <Card sx={{ 
                                height: '280px',
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: 'none', 
                                border: '1px solid #e0e0e0', 
                                borderRadius: 3, 
                                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, 
                                transition: '0.3s' 
                            }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={store.image || 'https://placehold.co/400x260?text=Store'}
                                    alt={store.name}
                                    sx={{ objectFit: 'cover', flexShrink: 0 }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ 
                                        fontWeight: 'bold', 
                                        fontSize: '1.1rem', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        minHeight: '1.65rem',
                                        mb: 1
                                    }}>
                                        {store.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        minHeight: '2.5rem'
                                    }}>
                                        {store.address}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', borderLeft: '5px solid #ff0000', pl: 2 }}>
                    本日のおすすめ
                </Typography>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3
                }}>
                    {displayedItems.map((item) => (                                
                        <Card key={item._id} sx={{ 
                            height: '420px',
                            display: 'flex', 
                            flexDirection: 'column', 
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            borderRadius: 3,
                            overflow: 'hidden', 
                            position: 'relative', 
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }
                        }}>
                                <IconButton 
                                    onClick={(e) => handleToggleFavorite(e, item._id)}
                                    sx={{ 
                                        position: 'absolute', 
                                        top: 8, 
                                        right: 8, 
                                        zIndex: 10, 
                                        bgcolor: 'rgba(255,255,255,0.8)',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                    }}
                                >
                                    {favorites.includes(item._id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                                </IconButton>

                                <Box component={RouterLink} to={`/details/${item._id}`} sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image && item.image !== "" ? item.image : 'https://placehold.co/600x400?text=No+Image'} 
                                        alt={item.name}
                                        sx={{
                                            width: '100%',
                                            height: '220px',
                                            objectFit: 'cover', 
                                            objectPosition: 'center',
                                            display: 'block',
                                            flexShrink: 0
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = 'https://placehold.co/600x400?text=Error+Image'
                                        }}
                                    />
                                    <CardContent sx={{ p: 2, pb: 0, bgcolor: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" component="div" 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                fontSize: '1rem', 
                                                lineHeight: 1.4, 
                                                mb: 1,
                                                display: '-webkit-box', 
                                                overflow: 'hidden', 
                                                WebkitBoxOrient: 'vertical', 
                                                WebkitLineClamp: 2,
                                                minHeight: '2.8rem',
                                                maxHeight: '2.8rem'
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        
                                        <Typography variant="body1" color="error" sx={{ fontWeight: 'bold', mt: 'auto' }}>
                                            {(item.price)}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                
                                <Box 
                                    component={RouterLink} 
                                    to={`/details/${item._id}/comments`} 
                                    sx={{ 
                                        textDecoration: 'none', 
                                        color: 'inherit', 
                                        p: 2, 
                                        pt: 1,
                                        bgcolor: '#fff',
                                        borderTop: '1px solid #f0f0f0',
                                        '&:hover': { bgcolor: '#fafafa' },
                                        flexShrink: 0
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar 
                                            src={item.comments?.[0]?.user?.avatar ? `http://localhost:5000${item.comments[0].user.avatar}` : ''} 
                                            sx={{ width: 24, height: 24, mr: 1 }} 
                                        >
                                            {item.comments?.[0]?.user?.username?.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                            {item.comments && item.comments.length > 0 
                                                ? `${item.comments.length} コメント` 
                                                : 'コメントなし'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                    ))}
                </Box>
            </Box>
            <SpinWheel />
        </Container>
    );
};

export default Dashboard;