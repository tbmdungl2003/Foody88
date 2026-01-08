import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
  Paper,
  Avatar,
  Link,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { loginAction } from "../api/api";
import api from "../api/axios"; 
import { AuthContext } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginAction({ email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuth({
        isAuthenticated: true,
        token: token,
        user: user,
      });
      
      if (user.role === 'admin' || user.role === 'Admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (apiError) {
      const errorMsg = apiError.response?.data?.msg || "ログインに失敗しました (Đăng nhập thất bại).";
      setError(errorMsg);
      console.error("Login error:", apiError);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            ログイン (Đăng nhập)
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メール "
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード "
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
            >
              ログイン
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 2 }}>hoặc</Divider>

            {/* Google Login Button */}
            <GoogleLoginButton 
              text="Đăng nhập với Google" 
              variant="contained"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"アカウントをお持ちでないですか？登録"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;