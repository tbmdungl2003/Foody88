import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-roulette-pro/dist/index.css';
import App from './App'; // Import component App chính

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Toàn bộ logic về Router và AuthProvider đã được xử lý bên trong App.js */}
    <App />
  </React.StrictMode>
);
