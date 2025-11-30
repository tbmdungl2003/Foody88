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
import Profile from './page/Profile'; 
import FoodDetails from './page/FoodDetails';import CommentPage from './page/CommentPage'; // 1. Import lại trang bình luận
import StorePage from './page/StorePage.jsx';
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/comments/:id" element={<CommentPage />} /> 
              <Route path="/details/:id" element={<FoodDetails />} /> 
              <Route path="/restaurent" element={<StorePage/>}/>
              
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;