import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios'; // Import axios instance

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true, // Thêm trạng thái loading để xử lý việc tải ban đầu
  });

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth') // Sử dụng route GET /auth đã có
        .then(res => {
          setAuth({ isAuthenticated: true, user: res.data, token, loading: false });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuth({ isAuthenticated: false, user: null, token: null, loading: false });
        });
    } else {
      setAuth(prev => ({ ...prev, loading: false })); // Nếu không có token, dừng loading
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};