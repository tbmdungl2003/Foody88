const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    // Trường này để phân loại món ăn theo địa điểm, ví dụ: "Ha Noi", "Da Nang"
    location: {
        type: String,
        required: true,
    },
    // Bạn có thể thêm các trường khác nếu cần
});

// 'food' là tên của collection trong MongoDB, nó sẽ tự động được chuyển thành 'foods'
module.exports = mongoose.model('food', FoodSchema);
