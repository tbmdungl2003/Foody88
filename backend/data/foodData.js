const FOOD_DATA_BY_LOCATION = {
    "Ha Noi": {
        name: "Hà Nội",
        items: [
            {
                id: 1,
                name: 'Phở Bò Hà Nội',
                price: '50.000 VNĐ',
                description: 'Phở là một món ăn truyền thống của Việt Nam, được xem là một trong những món ăn tiêu biểu cho ẩm thực Việt Nam. Nước dùng đậm đà, thịt bò mềm, bánh phở dai và các loại rau thơm tươi ngon tạo nên một hương vị khó quên.',
                address: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
                image: 'https://i.ytimg.com/vi/71qA4h-h-aE/maxresdefault.jpg',                
                comments: [
                    { id: 1, user: 'Aさん', avatar: 'https://i.pravatar.cc/150?u=a', text: 'Nước dùng ở đây thật tuyệt vời, rất đậm đà và thơm mùi xương hầm.', date: '2023-10-26' },
                    { id: 2, user: 'Bさん', avatar: 'https://i.pravatar.cc/150?u=b', text: 'Thịt bò mềm, không bị dai. Sẽ quay lại lần nữa!', date: '2023-10-25' }
                ]
            },
            {
                id: 2,
                name: 'Bún Chả',
                price: '45.000 VNĐ',
                description: 'Bún chả là món ăn với bún, chả thịt lợn nướng trên than hoa và bát nước mắm chua cay mặn ngọt. Món ăn xuất xứ từ miền Bắc Việt Nam, là thứ quà có sức sống lâu bền nhất của Hà Nội.',
                address: 'Số 1 Hàng Mành, Hoàn Kiếm, Hà Nội',
                image: 'https://cdn.tgdd.vn/2021/08/CookProduct/1-1200x676-40.jpg',                
                comments: [
                    { id: 3, user: 'Cさん', avatar: 'https://i.pravatar.cc/150?u=c', text: 'Chả nướng thơm lừng, nước chấm pha vừa miệng. Rất đáng thử.', date: '2023-09-15' }
                ]
            },
            {
                id: 3,
                name: 'Bánh Mì Phố Cổ',
                price: '30.000 VNĐ',
                description: 'Bánh mì giòn rụm kẹp với pate, thịt nướng, chả, dưa góp và rau thơm, rưới thêm nước sốt đậm đà. Một món ăn đường phố tuyệt vời, tiện lợi và đầy đủ dinh dưỡng.',
                address: '25 Hàng Cá, Hoàn Kiếm, Hà Nội',
                image: 'https://static.vinwonders.com/production/banh-mi-pho-co-ha-noi-1.jpg',                
                comments: [] // Ví dụ món ăn chưa có bình luận
            }
        ]
    },
    "Da Nang": {
        name: "Đà Nẵng",
        items: [
            {
                id: 4,
                name: 'Mì Quảng',
                price: '35.000 VNĐ',
                description: 'Mì Quảng là món ăn đặc sản của Đà Nẵng và Quảng Nam. Sợi mì dày, to và thô, ăn kèm với thịt heo, tôm, thịt gà và nước dùng được hầm từ xương heo. Món ăn còn có đậu phộng rang, bánh tráng mè nướng giòn.',
                address: '1A Hải Phòng, Hải Châu, Đà Nẵng',
                image: 'https://static.vinwonders.com/production/mi-quang-da-nang-1.jpg',                
                comments: [
                    { id: 4, user: 'Dさん', avatar: 'https://i.pravatar.cc/150?u=d', text: 'Hương vị đặc trưng không lẫn vào đâu được. Rất ngon!', date: '2023-11-01' }
                ]
            },
            {
                id: 5,
                name: 'Bánh tráng cuốn thịt heo',
                price: '80.000 VNĐ',
                description: 'Thịt heo được luộc hoặc quay giòn bì, thái lát mỏng, cuốn cùng với các loại rau sống tươi ngon trong một lớp bánh tráng mỏng. Chấm cùng mắm nêm đậm đà, tạo nên hương vị đặc trưng khó cưỡng.',
                address: 'Quán Mậu, 35 Đỗ Thúc Tịnh, Cẩm Lệ, Đà Nẵng',                
                image: 'https://cdn.tgdd.vn/2021/03/CookRecipe/GalleryStep/thanh-pham-1495.jpg',
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
                id: 6,
                name: 'Cơm Tấm Sài Gòn',
                price: '40.000 VNĐ',
                description: 'Cơm tấm là món ăn phổ biến ở Sài Gòn, được nấu từ hạt gạo tấm. Một đĩa cơm tấm đầy đủ thường có sườn nướng, bì, chả trứng và trứng ốp la, ăn kèm với nước mắm chua ngọt và đồ chua.',
                address: 'Cơm tấm Ba Ghiền, 84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM',
                image: 'https://stc.shopiness.vn/deal/2019/10/08/a/8/9/d/1570505962298_540.png',                
                comments: [
                    { id: 6, user: 'Fさん', avatar: 'https://i.pravatar.cc/150?u=f', text: 'Sườn nướng mềm và thấm vị, một đĩa rất chất lượng.', date: '2023-10-10' }
                ]
            },
            {
                id: 7,
                name: 'Hủ Tiếu Nam Vang',
                price: '55.000 VNĐ',
                description: 'Hủ tiếu Nam Vang có nguồn gốc từ Campuchia nhưng đã được biến tấu để phù hợp với khẩu vị người Việt. Nước dùng trong, ngọt thanh từ xương, ăn kèm với thịt bằm, tôm, trứng cút, gan heo và các loại rau giá.',
                address: 'Hủ tiếu Nhân Quán, 72 Nguyễn Thượng Hiền, Quận 3, TP.HCM',                
                image: 'https://cdn.tgdd.vn/2021/03/CookProduct/Hutiunamvang-1200x676.jpg',
                comments: []
            }
        ]
    }
};

module.exports = FOOD_DATA_BY_LOCATION;