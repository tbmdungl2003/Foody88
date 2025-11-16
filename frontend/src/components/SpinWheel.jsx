// import React, { useState, useMemo } from 'react';
// import Roulette from 'react-roulette-pro';

// // Dữ liệu mẫu
// const FOOD_OPTIONS = ['Phở Bò', 'Bún Chả', 'Nem Rán', 'Bánh Mì', 'Gỏi Cuốn'];

// // Màu nền cho các ô
// const WHEEL_COLORS = ['#FF6347', '#FFD700', '#ADFF2F', '#87CEEB', '#BA55D3'];

// // Map dữ liệu thành format của thư viện
// const prizes = FOOD_OPTIONS.map((name, idx) => ({ 
//     id: idx, 
//     text: name, 
// }));

// const SpinWheel = () => {
//     const [start, setStart] = useState(false);
//     const [winningPrize, setWinningPrize] = useState(0); // Index món ăn trúng thưởng
//     const [isSpinning, setIsSpinning] = useState(false); 

//     // Hàm kích hoạt quay
//     const handleStartSpinning = () => {
//         if (isSpinning) return;
        
//         // 1. Chọn ngẫu nhiên một index
//         const randomIndex = Math.floor(Math.random() * prizes.length);
//         setWinningPrize(randomIndex);
        
//         // 2. Kích hoạt quay
//         setIsSpinning(true);
//         setStart(true);
//     };

//     // Hàm được gọi khi vòng quay dừng lại
//     const handleSpinEnd = () => {
//         setIsSpinning(false);
//         setStart(false);
//         const result = prizes[winningPrize].text;
//         alert(`Chúc mừng! Món ăn được chọn là: ${result}`);
//     };

//     return (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//             <h2>Vòng Quay Chọn Món Ăn</h2>

//             {/* 1. Component Roulette */}
//             <div style={{ maxWidth: '800px', height: '180px', margin: '0 auto' }}>
//                 <Roulette
//                     prizes={prizes}
//                     start={start}                 // Bắt đầu quay khi 'start' là true
//                     winningPrize={winningPrize}   // Dừng ở index này
//                     onPrizeSelected={handleSpinEnd} // Xử lý khi dừng
                    
//                     // 2. Cấu hình thiết kế
//                     designOptions={{
//                         prizeItemWidth: 150, 
//                         prizeItemHeight: 150, 
//                         prizesWithText: true,       // Bật hiển thị text
//                         prizeItemText: { color: '#fff', fontSize: '14px', fontWeight: 'bold' },
//                         prizeItemColors: WHEEL_COLORS,
//                         hideSpinButton: true,       // Ẩn nút quay mặc định của thư viện
//                     }}
                    
//                     // 3. Cấu hình chức năng
//                     options={{
//                         rotationDuration: 8000,      // Thời gian quay cố định 8 giây
//                         stopInCenter: true,
//                     }}
//                 />
//             </div>

//             {/* Nút Kích hoạt */}
//             <button 
//                 onClick={handleStartSpinning} 
//                 disabled={isSpinning}
//                 style={{ marginTop: '20px', padding: '10px 30px', fontSize: '18px' }}
//             >
//                 {isSpinning ? 'ĐANG QUAY...' : 'START'}
//             </button>
//         </div>
//     );
// };

// export default SpinWheel;