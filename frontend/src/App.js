import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthWrapper } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './page/ProtectedRoutes.js';

import HomePage from './page/Homepage';
import Login from './page/Login';
import Register from './page/Register';
import Dashboard from './page/Dashboard';
import Layout from './components/Layout';
import MapComponent from './page/Map';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          {/* Các route công khai, ai cũng vào được */}
          <Route path="/homepage" element={<HomePage />} />

          {/* Các route chỉ người chưa đăng nhập mới vào được */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Các route chỉ người đã đăng nhập mới vào được */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapComponent />} />
              {/* Thêm các trang được bảo vệ khác ở đây, ví dụ: /profile */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;