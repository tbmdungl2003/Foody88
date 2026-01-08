import React, { useContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Box, Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLoginButton = ({ text = 'Đăng nhập với Google', variant = 'contained' }) => {
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // Khởi tạo Google Auth Provider
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Lấy ID Token
      const idToken = await user.getIdToken();

      // Gửi token tới backend để xác thực và tạo JWT
      const response = await api.post('/auth/google/login', {
        idToken,
      });

      const { token, user: userData } = response.data;

      // Lưu token và cập nhật state
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthState({
        isAuthenticated: true,
        user: userData,
        token,
        firebaseUser: user,
        loading: false,
      });

      setLoading(false);
    } catch (err) {
      console.error('Google login error:', err);
      setError(
        err.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.'
      );
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button
        fullWidth
        variant={variant}
        color="primary"
        onClick={handleGoogleLogin}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
        sx={{
          mt: 2,
          mb: 2,
          textTransform: 'none',
          fontSize: '1rem',
          backgroundColor: variant === 'contained' ? '#4285F4' : 'transparent',
          color: variant === 'contained' ? 'white' : '#4285F4',
          border: variant === 'outlined' ? '2px solid #4285F4' : 'none',
          '&:hover': {
            backgroundColor: variant === 'contained' ? '#357ae8' : 'rgba(66, 133, 244, 0.1)',
          },
        }}
      >
        {loading ? 'Đang xử lý...' : text}
      </Button>

      {error && (
        <Box
          sx={{
            color: 'error.main',
            fontSize: '0.875rem',
            mt: 1,
            p: 1,
            backgroundColor: 'error.light',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
};

export default GoogleLoginButton;
