import React, { createContext, useState } from 'react';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false, // Ban đầu, người dùng chưa đăng nhập
    user: null,
    token: null, // Không đọc từ localStorage nữa
  });

  // 3. Cung cấp state và hàm setAuth cho các component con
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};