// import React, { useState, useCallback } from 'react';
// import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, styled } from '@mui/material';
// import Wheel from 'react-wheel-of-prizes'; // <-- SỬ DỤNG LẠI THƯ VIỆN NÀY
// import FastfoodIcon from '@mui/icons-material/Fastfood'; 

// // --- DỮ LIỆU CÁC MÓN ĂN CỐ ĐỊNH ---
// const FOOD_OPTIONS = [
//     'Phở Bò', 'Bún Chả', 'Nem Rán', 'Bánh Mì', 'Gỏi Cuốn', 
//     'Cơm Tấm', 'Mì Quảng', 'Hủ Tiếu', 'Bún Bò Huế', 'Cháo Lòng',
//     'Bánh Xèo', 'Cao Lầu', 'Bún Đậu Mắm Tôm', 'Phở Cuốn', 'Bánh Gật Gù'
// ];

// // Định nghĩa màu sắc cho các ô trong vòng quay (đủ cho 15 món)
// const WHEEL_COLORS = [
//     '#FF6347', '#FFD700', '#ADFF2F', '#87CEEB', '#BA55D3', 
//     '#FF4500', '#DAA520', '#3CB371', '#4169E1', '#9370DB',
//     '#F08080', '#DDA0DD', '#7B68EE', '#B0E0E6', '#FFDAB9'
// ];

// // Dữ liệu vòng quay (chỉ cần mảng option)
// const wheelData = FOOD_OPTIONS.map((food, index) => ({
//     option: food,
// }));

// // Styled component cho nút START nằm giữa vòng quay
// const StyledSpinButton = styled(Button)(({ theme, isSpinning }) => ({
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     borderRadius: '50%',
//     width: 120, // Kích thước nút lớn hơn
//     height: 120, // Kích thước nút lớn hơn
//     minWidth: 0,
//     backgroundColor: isSpinning ? theme.palette.grey[400] : '#f7d057', // Màu vàng/xám
//     color: isSpinning ? theme.palette.grey[700] : '#533c02', // Màu chữ
//     fontWeight: 'bold',
//     fontSize: '1.2rem', // Chữ lớn hơn
//     boxShadow: theme.shadows[5],
//     zIndex: 10, 
//     // pointerEvents: 'none', // BỎ DÒNG NÀY ĐỂ NÚT NÀY KÍCH HOẠT QUAY
// }));

// const SpinWheel = ({ onFoodSelected }) => {
//     const [openResultDialog, setOpenResultDialog] = useState(false);
//     const [openWheelModal, setOpenWheelModal] = useState(false); 
//     const [mustStartSpinning, setMustStartSpinning] = useState(false); 
//     const [prizeNumber, setPrizeNumber] = useState(0); 
//     const [finalPrize, setFinalPrize] = useState(''); 
//     const [isSpinning, setIsSpinning] = useState(false); 

//     // Xử lý khi vòng quay dừng lại
//     const handleSpinStop = useCallback((prizeIndex) => {
//         const selectedFood = FOOD_OPTIONS[prizeIndex];
        
//         setFinalPrize(selectedFood);
//         setMustStartSpinning(false); 
//         setIsSpinning(false); 
        
//         // Đóng Modal sau khi hiển thị kết quả
//         setTimeout(() => {
//             setOpenResultDialog(true);
//             // Không đóng Modal vòng quay ngay để người dùng có thể thấy kết quả trên vòng quay một lát
//             // setOpenWheelModal(false); 
//         }, 300);

//         if (onFoodSelected) {
//             onFoodSelected(selectedFood);
//         }
//     }, [onFoodSelected]);

//     // Bắt đầu quay (Kích hoạt từ nút ở giữa vòng quay hoặc nút "スタート" bên dưới)
//     const handleStartSpinning = () => {
//         if (isSpinning) return; 

//         const randomIndex = Math.floor(Math.random() * FOOD_OPTIONS.length);
//         setPrizeNumber(randomIndex);
        
//         setMustStartSpinning(true); 
//         setIsSpinning(true);
//     };

//     // Mở Modal chứa vòng quay từ nút ở góc dưới
//     const handleOpenWheel = () => {
//         setOpenWheelModal(true);
//     };

//     const handleCloseResultDialog = () => {
//         setOpenResultDialog(false);
//         setFinalPrize('');
//     };

//     return (
//         <Box sx={{ 
//             position: 'fixed', 
//             bottom: 30, 
//             right: 30, 
//             zIndex: 1000, 
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//         }}>
//             {/* 1. Nút nhỏ ở góc dưới bên phải để MỞ MODAL */}
//             <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 sx={{
//                     borderRadius: '50%', 
//                     width: 80,
//                     height: 80,
//                     minWidth: 0, 
//                     boxShadow: 6,
//                     mb: 1, 
//                     '&:hover': {
//                         transform: 'scale(1.05)',
//                         transition: 'transform 0.2s ease-in-out',
//                     }
//                 }}
//                 onClick={handleOpenWheel} 
//                 aria-label="Quay để chọn món ăn"
//             >
//                 <FastfoodIcon sx={{ fontSize: 40 }} />
//             </Button>
//             <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Quay Món!</Typography>
            
//             {/* 2. Modal chứa vòng quay TRÒN */}
//             <Dialog
//                 open={openWheelModal}
//                 onClose={() => { 
//                     if (!isSpinning) { // Chỉ cho phép đóng Modal khi vòng quay không đang quay
//                         setOpenWheelModal(false);
//                     }
//                 }} 
//                 maxWidth="sm" 
//                 sx={{ 
//                     '& .MuiDialog-paper': { 
//                         p: 3, 
//                         borderRadius: 2, 
//                         textAlign: 'center',
//                         backgroundColor: '#fefefe', 
//                         border: '2px solid #ddd',
//                     } 
//                 }}
//             >
//                 <DialogTitle sx={{ p: 0, pb: 2 }}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
//                         運命のルーレット (Vòng quay định mệnh)
//                     </Typography>
//                 </DialogTitle>
//                 <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//                     <Box sx={{ position: 'relative', width: 550, height: 550, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
//                         <Wheel
//                             mustStartSpinning={mustStartSpinning}
//                             prizeNumber={prizeNumber}
//                             data={wheelData}
//                             onStopSpinning={handleSpinStop}
                            
//                             // 3. THIẾT KẾ TRÒN VÀ CHỮ
//                             outerBorderColor="#ffd700" 
//                             outerBorderWidth={10} 
//                             innerBorderColor="#ffd700" 
//                             innerBorderWidth={15}
//                             radiusLineColor="#333"
//                             radiusLineWidth={2}
//                             perpendicularText // Text sẽ quay vuông góc với bán kính
//                             textColors={['#ffffff']} 
//                             backgroundColors={WHEEL_COLORS}
//                             fontSize={18} 
//                             textMargin={10} 
//                             spinDuration={8} 
//                         />
//                         {/* Nút START tròn nằm giữa vòng quay */}
//                         <StyledSpinButton 
//                             onClick={handleStartSpinning} // Nút này kích hoạt quay
//                             disabled={isSpinning} 
//                         >
//                             {isSpinning ? '...' : '開始'}
//                         </StyledSpinButton>
//                     </Box>
                    
//                     {/* 4. Nút "スタート" riêng biệt bên dưới vòng quay (MÀU XANH) */}
//                     <Button
//                         variant="contained"
//                         color="primary" 
//                         size="large"
//                         sx={{ mt: 3, width: 200, py: 1.5, fontSize: '1.2rem' }}
//                         onClick={handleStartSpinning} 
//                         disabled={isSpinning} 
//                     >
//                         スタート (START)
//                     </Button>
//                 </DialogContent>
//             </Dialog>

//             {/* 5. Dialog hiển thị kết quả */}
//             <Dialog open={openResultDialog} onClose={handleCloseResultDialog}>
//                 <DialogTitle sx={{ textAlign: 'center' }}>Chúc mừng!</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="h5" align="center" sx={{ my: 2 }}>
//                         Món ăn được chọn là: <br />
//                         <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{finalPrize}</Box>
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseResultDialog} color="primary" autoFocus>
//                         Đóng
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default SpinWheel;