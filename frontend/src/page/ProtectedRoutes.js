import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Dành cho các trang chỉ người dùng đã đăng nhập mới vào được (vd: Dashboard, Profile)
 * Nếu chưa đăng nhập, sẽ bị chuyển về trang /login
 */
export const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/homepage" />;
};

/**
 * Dành cho các trang công khai (vd: Login, Register)
 * Nếu người dùng đã đăng nhập rồi mà cố vào lại, sẽ tự động chuyển về trang chủ (Dashboard)
 */
export const PublicRoute = () => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};