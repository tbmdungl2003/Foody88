const FOOD_DATA_BY_LOCATION = {
    "Ha Noi": {
        name: "Hà Nội",
        items: [
                {
                    _id: "food_hn_04", 
                    name: "Phở Tái",
                    price: "50.000 VNĐ",
                    image: "https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Thịt bò tươi được thái mỏng, trần chín tới bằng nước dùng nóng hổi, giữ trọn vị ngọt tự nhiên.",
                    address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội",
                    comments: []
                },
                {
                    _id: "food_hn_05", 
                    name: "Phở Gầu",
                    price: "55.000 VNĐ",
                    image: "https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Thịt gầu bò có cả nạc và mỡ, tạo nên độ béo ngậy và mềm mại khi thưởng thức.",
                    address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội", 
                    comments: []
                },
                {
                    _id: "food_hn_06", 
                    name: "Bánh Mì Bơ",
                    price: "20.000 VNĐ",
                    image: "https://images.unsplash.com/photo-1562877918-c2339a3a81a3?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Bánh mì giòn rụm kết hợp với lớp bơ thơm ngậy và một chút đường, món ăn sáng đơn giản mà hấp dẫn.",
                    address: "25 Hàng Cá, Hoàn Kiếm, Hà Nội", 
                    comments: []
                },
                {
                    _id: "food_hn_07", 
                    name: "Bánh Mì Thập Cẩm",
                    price: "30.000 VNĐ",
                    image: "https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Nhân đầy đặn với pate, chả, thịt nguội, dưa góp và rau thơm, tạo nên một bữa ăn hoàn chỉnh.",
                    address: "25 Hàng Cá, Hoàn Kiếm, Hà Nội", 
                    comments: []
                },

            {
                _id: "food_hn_01",
                name: 'Phở Bò',
                price: '50.000 VNĐ',
                description: 'Phở là một món ăn truyền thống của Việt Nam, được xem là một trong những món ăn tiêu biểu cho ẩm thực Việt Nam. Nước dùng đậm đà, thịt bò mềm, bánh phở dai và các loại rau thơm tươi ngon tạo nên một hương vị khó quên.',
                address: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                
                comments: [
                    { id: 1, user: 'Aさん', avatar: 'https://i.pravatar.cc/150?u=a', text: 'Nước dùng ở đây thật tuyệt vời, rất đậm đà và thơm mùi xương hầm.', date: '2023-10-26' },
                    { id: 2, user: 'Bさん', avatar: 'https://i.pravatar.cc/150?u=b', text: 'Thịt bò mềm, không bị dai. Sẽ quay lại lần nữa!', date: '2023-10-25' }
                ]
            },
            {
                _id: "food_hn_02",
                name: 'Bún Chả',
                price: '45.000 VNĐ',
                description: 'Bún chả là món ăn với bún, chả thịt lợn nướng trên than hoa và bát nước mắm chua cay mặn ngọt. Món ăn xuất xứ từ miền Bắc Việt Nam, là thứ quà có sức sống lâu bền nhất của Hà Nội.',
                address: 'Số 1 Hàng Mành, Hoàn Kiếm, Hà Nội',
                image: 'https://images.unsplash.com/photo-1627992256939-225880730385?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                
                comments: [
                    { id: 3, user: 'Cさん', avatar: 'https://i.pravatar.cc/150?u=c', text: 'Chả nướng thơm lừng, nước chấm pha vừa miệng. Rất đáng thử.', date: '2023-09-15' }
                ]
            },
            {
                _id: "food_hn_03",
                name: 'Bánh Mì Phố Cổ',
                price: '30.000 VNĐ',
                description: 'Bánh mì giòn rụm kẹp với pate, thịt nướng, chả, dưa góp và rau thơm, rưới thêm nước sốt đậm đà. Một món ăn đường phố tuyệt vời, tiện lợi và đầy đủ dinh dưỡng.',
                address: '25 Hàng Cá, Hoàn Kiếm, Hà Nội',
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                
                comments: [] // Ví dụ món ăn chưa có bình luận
            },
            {
                _id: "food_05",
                name: "Bún Đậu Mẹt Đầy Đủ",
                image: "https://images.unsplash.com/photo-1625449281218-cbb62a613953?q=80&w=1920",
                price: "45.000đ",
                description: "Mẹt bún đậu đầy đủ gồm bún lá, đậu rán giòn, chả cốm, thịt chân giò luộc, lòng và dồi rán.",
                address: "104 C6 Trung Tự, Đống Đa, Hà Nội"
            },
            {
                _id: "food_06",
                name: "Chả Cốm Làng Vòng",
                image: "https://images.unsplash.com/photo-1599036323674-4e7a842183f9?q=80&w=1920",
                price: "25.000đ/đĩa",
                description: "Chả cốm được làm từ cốm làng Vòng dẻo thơm, chiên vàng ruộm, ăn riêng hoặc kèm bún đậu.",
                address: "104 C6 Trung Tự, Đống Đa, Hà Nội"
            },
            {
                _id: "food_07",
                name: "Nem Chua Rán",
                image: "https://images.unsplash.com/photo-1619881599354-9a6a6f259326?q=80&w=1920",
                price: "30.000đ/đĩa",
                description: "Nem chua rán nóng hổi, vỏ ngoài giòn tan, bên trong chua nhẹ, chấm cùng tương ớt cay nồng.",
                address: "104 C6 Trung Tự, Đống Đa, Hà Nội"
            },
            // --- 3 MÓN CHO XÔI YẾN ---
            {
                _id: "food_08",
                name: "Xôi Xéo Gà Nấm",
                image: "https://images.unsplash.com/photo-1591192366312-e0a13499febc?q=80&w=1920",
                price: "40.000đ",
                description: "Xôi xéo truyền thống với hành phi, mỡ hành, ăn kèm thịt gà xé và sốt nấm đậm đà.",
                address: "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội"
            },
            {
                _id: "food_09",
                name: "Xôi Pate Lạp Xưởng",
                image: "https://images.unsplash.com/photo-1604329225382-a8b4a5115c5e?q=80&w=1920",
                price: "35.000đ",
                description: "Bát xôi trắng dẻo thơm, phủ đầy pate béo ngậy, lạp xưởng và ruốc.",
                address: "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội"
            },
            {
                _id: "food_10",
                name: "Xôi Thập Cẩm Đặc Biệt",
                image: "https://images.unsplash.com/photo-1626700051145-a521350343ce?q=80&w=1920",
                price: "50.000đ",
                description: "Phiên bản đầy đủ nhất với xôi, gà nấm, pate, lạp xưởng, trứng ốp và dưa góp.",
                address: "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội"
            },
            // --- 4 MÓN CHO CHẢ CÁ THĂNG LONG ---
            {
                _id: "food_11",
                name: "Chả Cá Lăng",
                image: "https://images.unsplash.com/photo-1579631542720-3a83835978b2?q=80&w=1920",
                price: "150.000đ/suất",
                description: "Thịt cá Lăng được tẩm ướp nghệ, riềng, nướng trên than hoa rồi đảo nóng trên chảo cùng thì là, hành lá.",
                address: "21 Đường Thành, Hoàn Kiếm, Hà Nội"
            },
            {
                _id: "food_12",
                name: "Lòng Cá Xào",
                image: "https://images.unsplash.com/photo-1625944239901-830321b4a439?q=80&w=1920",
                price: "80.000đ/đĩa",
                description: "Lòng cá được làm sạch, xào giòn với dứa và các loại rau thơm, là món nhậu tuyệt vời.",
                address: "21 Đường Thành, Hoàn Kiếm, Hà Nội"
            },
            {
                _id: "food_13",
                name: "Canh Đầu Cá",
                image: "https://images.unsplash.com/photo-1597019558922-3f1bf3b9e598?q=80&w=1920",
                price: "70.000đ/bát",
                description: "Đầu cá và xương được ninh kỹ, tạo nên bát canh chua ngọt thanh mát, giải ngấy hiệu quả.",
                address: "21 Đường Thành, Hoàn Kiếm, Hà Nội"
            },
            {
                _id: "food_14",
                name: "Bún Chả Cá",
                image: "https://images.unsplash.com/photo-1612929633738-9307c16c2a7e?q=80&w=1920",
                price: "60.000đ/bát",
                description: "Một biến tấu với nước dùng thanh ngọt, chả cá chiên vàng và các loại rau ăn kèm tươi ngon.",
                address: "21 Đường Thành, Hoàn Kiếm, Hà Nội"
            },
        ]
    },
    "Da Nang": {
        name: "Đà Nẵng",
        items: [
            {
                _id: "food_dn_01",
                name: 'Mì Quảng',
                price: '35.000 VNĐ',
                description: 'Mì Quảng là món ăn đặc sản của Đà Nẵng và Quảng Nam. Sợi mì dày, to và thô, ăn kèm với thịt heo, tôm, thịt gà và nước dùng được hầm từ xương heo. Món ăn còn có đậu phộng rang, bánh tráng mè nướng giòn.',
                address: '1A Hải Phòng, Hải Châu, Đà Nẵng', 
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                
                comments: [
                    { id: 4, user: 'Dさん', avatar: 'https://i.pravatar.cc/150?u=d', text: 'Hương vị đặc trưng không lẫn vào đâu được. Rất ngon!', date: '2023-11-01' }
                ]
            },
            {
                _id: "food_dn_02",
                name: 'Bánh tráng cuốn thịt heo',
                price: '80.000 VNĐ',
                description: 'Thịt heo được luộc hoặc quay giòn bì, thái lát mỏng, cuốn cùng với các loại rau sống tươi ngon trong một lớp bánh tráng mỏng. Chấm cùng mắm nêm đậm đà, tạo nên hương vị đặc trưng khó cưỡng.',
                address: 'Quán Mậu, 35 Đỗ Thúc Tịnh, Cẩm Lệ, Đà Nẵng',                
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                comments: [
                    { id: 5, user: 'Eさん', avatar: 'https://i.pravatar.cc/150?u=e', text: 'Rau sống tươi, mắm nêm là linh hồn của món này.', date: '2023-10-20' }
                ]
            }
        ]
    },
    "Ho Chi Minh": {
        name: "TP. Hồ Chí Minh",
        items: [
            {
                _id: "food_hcm_01",
                name: 'Cơm Tấm Sài Gòn',
                price: '40.000 VNĐ',
                description: 'Cơm tấm là món ăn phổ biến ở Sài Gòn, được nấu từ hạt gạo tấm. Một đĩa cơm tấm đầy đủ thường có sườn nướng, bì, chả trứng và trứng ốp la, ăn kèm với nước mắm chua ngọt và đồ chua.',
                address: 'Cơm tấm Ba Ghiền, 84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM',
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                
                comments: [
                    { id: 6, user: 'Fさん', avatar: 'https://i.pravatar.cc/150?u=f', text: 'Sườn nướng mềm và thấm vị, một đĩa rất chất lượng.', date: '2023-10-10' }
                ]
            },
            {
                _id: "food_hcm_02",
                name: 'Hủ Tiếu Nam Vang',
                price: '55.000 VNĐ',
                description: 'Hủ tiếu Nam Vang có nguồn gốc từ Campuchia nhưng đã được biến tấu để phù hợp với khẩu vị người Việt. Nước dùng trong, ngọt thanh từ xương, ăn kèm với thịt bằm, tôm, trứng cút, gan heo và các loại rau giá.',
                address: 'Hủ tiếu Nhân Quán, 72 Nguyễn Thượng Hiền, Quận 3, TP.HCM',                
                image: 'https://images.unsplash.com/photo-1596956890401-ef1958785325?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                comments: []
            }
        ]
    }
};

module.exports = FOOD_DATA_BY_LOCATION;