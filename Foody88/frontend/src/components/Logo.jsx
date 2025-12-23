import React from 'react';
import { Box } from '@mui/material';

// Biểu tượng SVG tượng trưng cho Foody88
const Logo = ({ size = 60 }) => {
    // Màu sắc từ logo gốc
    const redBrown = '#B33A3A';
    const goldYellow = '#FFD700';

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                height: size, 
                width: 'auto' 
            }}
        >
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 5 }}
            >

                <path d="M50 85c-20 0-35-10-35-25h70c0 15-15 25-35 25z" fill={goldYellow} stroke={redBrown} strokeWidth="3"/>
                <circle cx="50" cy="60" r="18" fill={redBrown}/>
                <rect x="55" y="25" width="5" height="30" rx="2" fill={redBrown} transform="rotate(20 60 40)"/>
                <rect x="60" y="20" width="5" height="30" rx="2" fill={redBrown} transform="rotate(20 60 40)"/>
                <text x="35" y="75" fontFamily="Arial" fontSize="18" fill="white" fontWeight="bold">88</text>
            </svg>
            
            {/* Tên thương hiệu - Foody88 */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: redBrown }}>Foody</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: goldYellow }}>88</span>
            </Box>
        </Box>
    );
};

export default Logo;