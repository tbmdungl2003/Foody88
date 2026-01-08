import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../api/axios';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    firebaseUser: null,
    loading: true,
  });

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth); // Firebase logout
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        firebaseUser: null,
        loading: false,
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Xử lý Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Người dùng đã đăng nhập với Firebase
        try {
          const idToken = await firebaseUser.getIdToken();

          // Gửi token tới backend để xác thực
          const response = await api.post('/auth/firebase/verify', {
            idToken,
          });

          const { token, user } = response.data;
          localStorage.setItem('token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setAuth({
            isAuthenticated: true,
            user,
            token,
            firebaseUser,
            loading: false,
          });
        } catch (err) {
          console.error('Firebase verification error:', err);
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            firebaseUser: null,
            loading: false,
          });
        }
      } else {
        // Người dùng chưa đăng nhập
        const token = localStorage.getItem('token');

        if (token) {
          // Kiểm tra token JWT cũ
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          api
            .get('/auth')
            .then((res) => {
              setAuth({
                isAuthenticated: true,
                user: res.data,
                token,
                firebaseUser: null,
                loading: false,
              });
            })
            .catch(() => {
              localStorage.removeItem('token');
              setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
                firebaseUser: null,
                loading: false,
              });
            });
        } else {
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            firebaseUser: null,
            loading: false,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};