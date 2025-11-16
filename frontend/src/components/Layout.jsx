import React from 'react';
import { Box, AppBar, Toolbar, Container, CssBaseline, IconButton, Link, Typography } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'; // Sử dụng Outlet và useLocation
import Logo from './Logo';

const Layout = () => {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  return (
    <CssBaseline>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* === Header === */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo size={40} />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, marginLeft: 3, marginRight: 5 }}>
                <Link 
                  component={RouterLink} 
                  to="/" 
                  color="inherit" 
                  underline="none" 
                  sx={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}
                >
                  ホーム
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/about" 
                  color="inherit" 
                  underline="none"
                  sx={{ fontWeight: location.pathname === '/about' ? 'bold' : 'normal' }}
                >
                  紹介
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/map" 
                  color="inherit" 
                  underline="none"
                  sx={{ fontWeight: location.pathname === '/map' ? 'bold' : 'normal' }}
                >
                  地図
                </Link>
                <Link component={RouterLink} to="/contact" color="inherit" underline="none" sx={{ fontWeight: location.pathname === '/contact' ? 'bold' : 'normal' }}>連絡</Link>
              </Box>
            </Box>
            <IconButton color="inherit" component={RouterLink} to="/profile">
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* === Main Content (Nội dung các trang con sẽ được render ở đây) === */}
        <Outlet />

        {/* === Footer === */}
        <Box
          component="footer"
          sx={{
            py: 3,
            mt: 'auto', // Đảm bảo footer luôn ở cuối
            backgroundColor: (t) => t.palette.grey[100],
            borderTop: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              フッター © {new Date().getFullYear()} Foody88. All rights reserved. | 著作権や情報リンク表示 (Bản quyền và thông tin liên kết)
            </Typography>
          </Container>
        </Box>
      </Box>
    </CssBaseline>
  );
};

export default Layout;