import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Alert, // Thêm Alert để hiển thị lỗi
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { register } from "../api/api";
import api from "../api/axios"; // Import axios instance để gọi API /auth
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Register = () => {
  const { setAuth } = useContext(AuthContext); // Lấy hàm setAuth từ Context
  const navigate = useNavigate(); // Hook để chuyển hướng

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState(null); // State để lưu lỗi từ API

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset lỗi mỗi khi submit

    if (password !== confirmPassword) {
      setError("パスワードが一致しません (Mật khẩu không khớp)!");
      return;
    }
    if (!agreedToTerms) {
      setError("ユーザー権利に同意してください (Vui lòng đồng ý với điều khoản).");
      return;
    }

    try {
      // 1. Gọi API đăng ký và nhận về cả token và user
      const response = await register({ username, email, password });
      const { token, user } = response.data;

      // 2. Lưu token và đặt header cho các request sau
      localStorage.setItem("token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 3. Cập nhật AuthContext để đăng nhập người dùng
      setAuth({
        isAuthenticated: true,
        token: token,
        user: user,
      });

      // 4. Chuyển hướng đến trang Dashboard ngay lập tức
      navigate("/");

    } catch (apiError) {
      // Xử lý lỗi từ backend
      const errorMsg = apiError.response?.data?.errors
        ? apiError.response.data.errors.map(err => err.msg).join(', ')
        : apiError.response?.data?.msg || "登録に失敗しました (Đăng ký thất bại).";
      setError(errorMsg);
      console.error("Registration error:", apiError);
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
      <Box
        sx={{
          border: "1px solid #ccc",
          width: 80,
          height: 30,
          margin: "0 auto 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2">LOGO</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="ユーザー名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <TextField
          label="パスワードをもう一度入力してください"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={password !== confirmPassword && confirmPassword.length > 0}
          helperText={
            password !== confirmPassword && confirmPassword.length > 0
              ? "パスワードが一致しません"
              : ""
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              name="agreeTerms"
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              <Link href="#" color="primary" underline="hover">
                ユーザー権利
              </Link>
              に同意する
            </Typography>
          }
          sx={{ mt: 1, mb: 3, justifyContent: "flex-start", width: "100%" }}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!agreedToTerms}
            sx={{ flexGrow: 1 }}
          >
            アカウントを作成する
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="secondary"
            sx={{ minWidth: 100 }}
          >
            ログイン
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;