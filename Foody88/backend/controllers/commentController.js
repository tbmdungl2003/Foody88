const FOOD_DATA_BY_LOCATION = require('../data/foodData.js');
const User = require('../models/User'); // Import User model để lấy thông tin thật

const getCommentsByFoodId = (req, res) => {
    try {
        const foodId = req.params.foodId;
        const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
        // Sửa lỗi: Tìm kiếm bằng `_id` thay vì `id`
        const food = allItems.find(item => item._id === foodId); 

        if (food && food.comments) {       
            // Sắp xếp bình luận mới nhất lên đầu
            const sortedComments = [...food.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
            res.json(sortedComments); 
        } else {
            res.json([]); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addComment = async (req, res) => {
    try {
        const foodId = req.params.foodId;
        const { text } = req.body;
        const user = await User.findById(req.user.id).select('-password'); // Lấy thông tin user từ DB

        if (!user) {
            return res.status(404).json({ msg: 'Không tìm thấy người dùng' });
        }
        if (!text) {
            return res.status(400).json({ msg: 'Nội dung bình luận không được để trống' });
        }

        const newCommentData = {
            id: new Date().getTime(), // ID đơn giản
            user: user.username,
            avatar: user.avatar || '',
            text: text,
            date: new Date().toISOString(),
        };

        // Logic để thêm bình luận vào foodData (hiện tại chỉ trả về, chưa lưu lại)
        // Trong DB thật, bạn sẽ tìm món ăn và push bình luận này vào mảng comments của nó.

        res.status(201).json(newCommentData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCommentsByFoodId, addComment };