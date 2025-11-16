import React, { createContext, useState } from 'react';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    // --- FOR DEVELOPMENT ONLY ---
    // Trạng thái mặc định là đã đăng nhập để phát triển các tính năng trong dashboard
    isAuthenticated: true, 
    user: { username: 'Dev User', email: 'dev@example.com', _id: 'dev123' },
    token: 'dev-token',
    // --------------------------
  });

  // 3. Cung cấp state và hàm setAuth cho các component con
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};