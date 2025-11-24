const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCommentsByFoodId, addComment } = require('../controllers/commentController');

// @route   GET api/comments/:foodId
// @desc    Lấy tất cả bình luận của một món ăn
// @access  Public
router.get('/:foodId', getCommentsByFoodId);

// @route   POST api/comments/:foodId
// @desc    Thêm một bình luận mới
// @access  Private
router.post('/:foodId', auth, addComment);

module.exports = router;