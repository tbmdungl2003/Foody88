import React, { useContext, useState } from 'react';
import { Box, AppBar, Toolbar, Container, CssBaseline, Link, Typography, IconButton, Menu, MenuItem, Button, Divider, Avatar } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'; // Sử dụng Outlet và useLocation
import Logo from './Logo';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Layout = () => {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
  const { auth, logout } = useContext(AuthContext); // Lấy thông tin xác thực và hàm logout

  // State để quản lý việc mở/đóng menu profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

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
            
            {auth.isAuthenticated ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {auth.user?.avatar ? (
                      // Nếu có avatar, hiển thị ảnh
                      <Avatar 
                          src={`http://localhost:5000${auth.user.avatar}`} 
                          alt={auth.user.username}
                          sx={{ width: 32, height: 32 }} 
                      />
                  ) : (
                      // Nếu không, hiển thị chữ cái đầu
                      <AccountCircleIcon sx={{ fontSize: 32 }} />
                  )}
                  {auth.user && <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
                    {auth.user.username}
                  </Typography>}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>プロファイル (Profile)</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>ログアウト (Đăng xuất)</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button component={RouterLink} to="/login" variant="outlined" color="inherit">
                ログイン (Đăng nhập)
              </Button>
            )}
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