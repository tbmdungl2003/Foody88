import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar, Container, CssBaseline, } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../components/Logo';

const HomePage = () => {
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
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (t) => `1px solid ${t.palette.divider}` }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>

            {/* 1. Logo (Trái) */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              <Logo size={80} />
            </Box>

            {/* Các nút hành động (2 & 3) (Phải) */}
            <Box sx={{ display: 'flex', gap: 1 }}>

              {/* 2. ログイン (Đăng nhập) */}
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ minWidth: 150 }}
              >
                ログイン
              </Button>

              {/* 3. レジスター (Đăng ký) */}
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                sx={{ minWidth: 150 }}
              >
                レジスター
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* === Main Content (Vị trí 4) === */}
        <Container component="main" sx={{ flexGrow: 1, py: 8, textAlign: 'center' }}>

          {/* 4. プログラム名 (Tên chương trình) */}
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Foody88
          </Typography>

          {/* Giới thiệu chương trình */}
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mt: 2 }}>
            Foody88へようこそ！あなたの食の冒険を始めましょう。<br />
            (Chào mừng đến với Foody88! Hãy bắt đầu cuộc phiêu lưu ẩm thực của bạn.)
          </Typography>
        </Container>

        {/* === Footer (Vị trí 5) === */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto', // Đẩy Footer xuống cuối trang
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[200] : t.palette.grey[800],
            borderTop: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            {/* 5. フッター (Footer) */}
            <Typography variant="body2" color="text.secondary">
              フッター © {new Date().getFullYear()} Foody88. All rights reserved. | プライバシーポリシー
            </Typography>
          </Container>
        </Box>
      </Box>
    </CssBaseline>
  );
};

export default HomePage;