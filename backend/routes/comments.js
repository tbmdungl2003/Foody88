const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js'); // Import middleware xác thực thật
const { getCommentsByFoodId, addComment } = require('../controllers/commentController');

router.get('/:foodId', getCommentsByFoodId);
router.post('/:foodId', authMiddleware, addComment); // Sử dụng middleware thật

module.exports = router;