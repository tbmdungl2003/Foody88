import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../api/api";
import api from "../api/axios"; 
import { AuthContext } from "../context/AuthContext";

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
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        ログイン
      </Typography>

      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="メール"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="パスワード"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          ログイン
        </Button>
      </form>
    </Box>
  );
};

export default Login;