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
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (t) => `1px solid ${t.palette.divider}` }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
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
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ minWidth: 150 }}
              >
                ログイン
              </Button>
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
        <Container component="main" sx={{ flexGrow: 1, py: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Foody88
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mt: 2 }}>
            Foody88へようこそ。美味しい料理は、心を満たし、人々をつなぎます。<br />
            あなたにとっての「至福の一皿」を見つける旅を、ここからスタートしましょう。
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto', 
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[200] : t.palette.grey[800],
            borderTop: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
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