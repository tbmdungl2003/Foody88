const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    // Người dùng đã viết bình luận
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    // Món ăn được bình luận
    food: {
        type: Schema.Types.ObjectId,
        ref: 'food', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comment', CommentSchema);