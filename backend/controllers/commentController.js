const FOOD_DATA_BY_LOCATION = require('../data/foodData.js');

// Giả lập model Comment và User để tạo dữ liệu trả về giống với DB thật
const User = {
    _id: '60c72b2f9b1d8c001f8e4d00', // ID giả
    username: 'CurrentUser',
    avatar: '/uploads/default-avatar.png'
};

// @desc    Lấy tất cả bình luận cho một món ăn
// @route   GET /api/comments/:foodId
// @access  Public
const getCommentsByFoodId = (req, res) => {
    try {
        const foodId = req.params.foodId;
        const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
        const food = allItems.find(item => String(item.id) == foodId); // Sử dụng so sánh lỏng (==) hoặc chuyển kiểu

        if (food && food.comments) {
            // Biến đổi dữ liệu để giống với cấu trúc từ DB
            const formattedComments = food.comments.map(comment => ({
                _id: String(comment.id), // Dùng id của comment làm _id
                text: comment.text,
                createdAt: comment.date,
                user: { // Giả lập đối tượng user được populate
                    username: comment.user,
                    avatar: comment.avatar
                }
            }));
            res.json(formattedComments.reverse()); // Đảo ngược để bình luận mới nhất lên đầu
        } else {
            res.json([]); // Trả về mảng rỗng nếu không có món ăn hoặc không có bình luận
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Thêm một bình luận mới cho món ăn
// @route   POST /api/comments/:foodId
// @access  Private (Cần đăng nhập)
const addComment = (req, res) => {
    try {
        const newCommentData = {
            _id: new Date().getTime().toString(), // Tạo ID giả duy nhất
            text: req.body.text,
            createdAt: new Date().toISOString(),
            user: { 
                username: req.user.name || req.user.username, // Lấy 'name' hoặc 'username'
                avatar: req.user.avatar
            }
        };

        res.status(201).json(newCommentData); // Trả về 201 Created và dữ liệu bình luận mới
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCommentsByFoodId, addComment };