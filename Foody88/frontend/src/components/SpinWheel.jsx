import React, { useState } from 'react';
import { motion, animate } from "framer-motion";

// --- DỮ LIỆU ---
const DISHES_DATA = [
    { id: 1, name: "Phở Bò", color: "#FF6B6B", image: "https://th.bing.com/th/id/R.0b38f29635cec8a6e285990cf140465d?rik=NlF6EE%2bQHOe5IA&riu=http%3a%2f%2fcachnauan.edu.vn%2fwp-content%2fuploads%2f2015%2f08%2fcach_nau_pho_bo_ngon_nhat3.jpg&ehk=8tZlydAAos1m8DPM%2b6iykOvm7GVLyYu0q1JVh%2bwOQV8%3d&risl=&pid=ImgRaw&r=0" },
    { id: 2, name: "Bún Chả", color: "#4ECDC4", image: "https://toplist.vn/images/800px/bun-cha-hoang-nhi-517302.jpg" },
    { id: 3, name: "Cơm Tấm", color: "#45B7D1", image: "https://dienmaynewsun.com/wp-content/uploads/2019/08/quan-com-tam-ngon.jpg" },
    { id: 4, name: "Bánh Mì", color: "#FFA07A", image: "https://static.vinwonders.com/production/banh-mi-ha-noi-1.jpg" },
    { id: 5, name: "Hủ Tiếu", color: "#98D8C8", image: "https://tse3.mm.bing.net/th/id/OIP.xbDNxl3783761oT0GnVQTwHaJP?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 6, name: "Bún Bò", color: "#F7D794", image: "https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" }
];

const SpinWheel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rotation, setRotation] = useState(0); 
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);

    const handleClose = () => {
        if (isSpinning) return;
        setIsOpen(false);
        setWinner(null);
    };

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setWinner(null);

        const randomIndex = Math.floor(Math.random() * DISHES_DATA.length);
        const selectedDish = DISHES_DATA[randomIndex];

        const sliceDeg = 360 / DISHES_DATA.length;
        const elementCenter = (randomIndex * sliceDeg) + (sliceDeg / 2);
        
        const currentRotation = rotation;
        const currentOffset = currentRotation % 360;
        const resetRotation = 360 - currentOffset; 
        const spins = 360 * 5; 
        const randomOffset = Math.floor(Math.random() * 20) - 10;
        
        const targetRotation = currentRotation + resetRotation + spins - elementCenter + randomOffset;

        animate(currentRotation, targetRotation, {
            duration: 4,
            ease: [0.25, 0.1, 0.25, 1],
            onUpdate: (latest) => setRotation(latest),
            onComplete: () => {
                setIsSpinning(false);
                setWinner(selectedDish);
                setRotation(targetRotation);
            }
        });
    };

    const wheelBackground = `conic-gradient(
        ${DISHES_DATA.map((dish, i) => {
            const start = (i * 100) / DISHES_DATA.length;
            const end = ((i + 1) * 100) / DISHES_DATA.length;
            return `${dish.color} ${start}% ${end}%`;
        }).join(', ')}
    )`;

    return (
        <>
            <style>{`
                /* --- NÚT TRÔI NỔI --- */
                .wheel-float-btn {/* QUAN TRỌNG: Giữ position: fixed để nút trôi nổi */
                    position: fixed; 
                    bottom: 30px; 
                    right: 30px; 
                    width: 60px; 
                    height: 60px;
                    
                    /* Giao diện */
                    border-radius: 50%; 
                    border: 3px solid white; 
                    cursor: pointer; 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4); 
                    z-index: 99999; /* Tăng z-index để chắc chắn hiện lên trên */
                    
                    /* Hiệu ứng và màu nền */
                    transition: transform 0.2s; 
                    background: ${wheelBackground}; 
                    animation: spin-slow 10s linear infinite; 
                }
                
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .wheel-float-btn:hover { transform: scale(1.15) rotate(0deg); animation: none; }
                
                /* Kim chỉ nút nhỏ */
                .wheel-float-btn::before {
                    content: ''; position: absolute; top: 50%; left: 50%; transform-origin: bottom center; 
                    transform: translateX(-50%) translateY(-100%); width: 0; height: 0;
                    border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 14px solid #ff4757; z-index: 2;
                }
                /* Tâm nút nhỏ */
                .wheel-float-btn::after {
                    content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    width: 12px; height: 12px; background: white; border-radius: 50%; z-index: 3;
                }

                /* --- MODAL --- */
                .wheel-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.6); z-index: 100000;
                    display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);
                }
                .wheel-container { padding: 0; text-align: center; position: relative; width: 90%; max-width: 400px; }

                /* --- VÒNG QUAY LỚN --- */
                .wheel-spinner-container {
                    width: 300px; height: 300px; margin: 0 auto 20px; position: relative;
                }
                .wheel-spinner {
                    width: 100%; height: 100%; border-radius: 50%; 
                    border: 5px solid #fff; box-shadow: 0 0 20px rgba(255,255,255,0.2); overflow: hidden;
                }

                .wheel-pointer { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20; width: 0; height: 0; }
                .wheel-pointer::before {
                    content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 40px solid #ff4757;
                }
                .wheel-pointer::after {
                    content: ''; position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%);
                    width: 30px; height: 30px; background: white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                }

                .wheel-text-slot { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                .wheel-text {
                    position: absolute; top: 25px; left: 50%; transform: translateX(-50%);
                    color: white; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 4px rgba(0,0,0,0.8); width: 80px; text-align: center;
                }

                .result-box { margin-top: 10px; color: white; }
                .result-img { width: 220px; height: 220px; object-fit: cover; border-radius: 50%; border: 4px solid #fff; margin-bottom: 15px; }
                .spin-btn {
                    padding: 12px 40px; background: #2ed573; color: white; border: none; border-radius: 30px;
                    font-size: 20px; font-weight: bold; cursor: pointer; margin-top: 15px; box-shadow: 0 0 15px rgba(46, 213, 115, 0.5);
                }
                .spin-btn:disabled { background: #7f8c8d; cursor: not-allowed; }
                .close-icon { position: absolute; top: -40px; right: 0; font-size: 35px; cursor: pointer; color: white; opacity: 0.8; }
            `}</style>

            <button className="wheel-float-btn" onClick={() => setIsOpen(true)}></button>

            {isOpen && (
                <div className="wheel-overlay" onClick={handleClose}>
                    <motion.div 
                        className="wheel-container" 
                        onClick={e => e.stopPropagation()}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="close-icon" onClick={handleClose}>&times;</div>

                        {!winner ? (
                            <>
                                <h2 style={{color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '20px'}}>今日は何食べる？</h2>
                                <div className="wheel-spinner-container">
                                    <div className="wheel-pointer"></div>
                                    <motion.div 
                                        className="wheel-spinner" 
                                        style={{ 
                                            background: wheelBackground,
                                            rotate: rotation 
                                        }}
                                    >
                                        {DISHES_DATA.map((item, index) => {
                                            const sliceDeg = 360 / DISHES_DATA.length;
                                            const rotateVal = (sliceDeg * index) + (sliceDeg / 2);
                                            return (
                                                <div key={item.id} className="wheel-text-slot" style={{ transform: `rotate(${rotateVal}deg)` }}>
                                                    <div className="wheel-text">{item.name}</div>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                </div>
                                <button className="spin-btn" onClick={handleSpin} disabled={isSpinning}>
                                    {isSpinning ? '回転中...' : 'スタート！'}
                                </button>
                            </>
                        ) : (
                            <motion.div 
                                className="result-box"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3 style={{fontSize: '20px', marginBottom:'10px'}}>決定！これにしましょう：</h3>
                                <img src={winner.image} alt={winner.name} className="result-img" />
                                <h2 style={{color: '#ff4757', fontSize: '28px', margin: '5px 0'}}>{winner.name}</h2>
                                <button className="spin-btn" onClick={() => setWinner(null)} style={{backgroundColor: '#ff4757'}}>
                                    もう一度
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default SpinWheel;