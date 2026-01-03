const STORE_DATA = {
    hanoi: {
        name: "Hà Nội",
        items: [
            {
                id: "store_01",
                name: "Phở Gia Truyền Bát Đàn",
                address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội",
                image: "https://mia.vn/media/uploads/blog-du-lich/Pho-bat-dan-pho-gia-truyen-100-nam-tuoi-tai-ha-noi-01-1639325605.jpg",
                open: "6:00 - 22:00",
                description: "Thương hiệu phở gia truyền nổi tiếng với hương vị nước dùng đậm đà và sợi phở mềm mại.",
                lat: 21.0338,
                lng: 105.8486
            },
            {
                id: "store_02",
                name: "Bún Chả Hàng Mành",
                address: "Số 1 Hàng Mành, Hoàn Kiếm, Hà Nội",
                image: "https://lh3.googleusercontent.com/p/AF1QipO4G_bbDappxOdKFgqe2-eUVpjRDI8uZ13lHX6r=s1360-w1360-h1020-rw",
                open: "10:00 - 21:00",
                description: "Quán bún chả lâu đời, nổi tiếng với chả nướng thơm lừng và nước chấm pha vừa miệng.",
                lat: 21.0326,
                lng: 105.8490
            },
            {
                id: "store_05",
                name: "Bún Đậu Mẹt Trung Tự",
                address: "104 C6 Trung Tự, Đống Đa, Hà Nội",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSycWwzSCgijYpPZokSgTb7LPmP4mQ8GYyr7HgXdfLPAs6lMA1FAS_W3bD5SWU78EetVsIFdZZnRkvZJbdSjnwN16ZGg7YEUzs8Ea4dmJ3VpYQAPRwc67LgMSshnvu5FWDZjR4C15g=s1360-w1360-h1020-rw", // Ảnh giống store_03
                open: "10:00 - 21:30",
                description: "Quán bún đậu mắm tôm nổi tiếng với mẹt đầy đặn, chả cốm thơm và lòng dồi rán giòn.",
                lat: 21.0118,
                lng: 105.8285
            },
            {
                id: "store_06",
                name: "Xôi Yến Nguyễn Hữu Huân",
                address: "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội",
                image: "https://tophanoiaz.com/wp-content/uploads/2024/01/xoi-yen-nguyen-huu-huan_9.jpg", 
                open: "6:30 - 23:00",
                description: "Thương hiệu xôi nức tiếng Hà Thành với nhiều loại topping phong phú như gà xé, pate, lạp xưởng.",
                lat: 21.0321,
                lng: 105.8545
            },
            {
                id: "store_07",
                name: "Chả Cá Thăng Long",
                address: "21 Đường Thành, Hoàn Kiếm, Hà Nội",
                image: "https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-cha-ca-thang-long-duong-thanh-slide-1-normal-12069355172.webp", // Ảnh giống store_01
                open: "11:00 - 14:00 & 17:00 - 21:00",
                description: "Món chả cá Lăng gia truyền ăn kèm bún, rau thì là, lạc rang và mắm tôm.",
                lat: 21.0333,
                lng: 105.8468
            },
        ]
    },
    danang: {
        name: "Đà Nẵng",
        items: [{
            id: "store_03",
            name: "Đặc sản Mì Quảng Đà Nẵng",
            address: "1A Hải Phòng, Hải Châu, Đà Nẵng",
            image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzNQJWG_4d1m0IXFXU8Dl5EgaRd4pzZ2LbAMHf9EQiHRW5CBLOxZWiDhFD1sOup37F0UURfawkqlAzmldbpVSvNF3jqAVpRw4aSmIUxYa17S8gSlD5qymrwbcsBIAJl_uvfcbqDGh9WbROR=w325-h218-n-k-no",
            open: "7:00 - 22:30",
            description: "Tập hợp các món ăn đặc sản miền Trung trong một không gian kiến trúc cổ độc đáo.",
            lat: 16.0695,
            lng: 108.2211
        }]
    },
    hochiminh: {
        name: "TP. Hồ Chí Minh",
        items: [{
            id: "store_04",
            name: "Cơm Tấm Ba Ghiền",
            address: "84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM",
            image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx-94W-hUoQ_YUM62igKFtbGQd7sjGOVYmRotnv8TNPKL6fLSxD-Kxg8xovCw6LFkD65sonu2d81hKdddwaiNuuB5TIZ9m9cZs0EQibouGivv0k_VSjbjnuHaCpUC4ohOmOHGTYOO-RNL6j=s1360-w1360-h1020-rw",
            open: "7:30 - 21:00",
            description: "Quán cơm tấm nổi tiếng với miếng sườn cốt lết to, nướng thấm vị và các món ăn kèm đa dạng.",
            lat: 10.7915,
            lng: 106.6758
        }]
    }
};

module.exports=STORE_DATA