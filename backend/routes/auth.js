const express = require("express");
const router = express.Router();
const { register, login, getLoggedInUser } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/auth.js');
const { check } = require('express-validator');

// @route   GET api/auth
// @desc    Get logged in user (Lấy thông tin người dùng đã đăng nhập)
// @access  Private (Cần token)
router.get('/', authMiddleware, getLoggedInUser);

// @route   POST api/auth/register
// @desc    Register a user (Đăng ký người dùng)
// @access  Public
router.post(
  '/register',
  [
    // Các quy tắc validation từ express-validator
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

// @route   POST api/auth/login
// @desc    Auth user & get token (Đăng nhập và lấy token)
// @access  Public
router.post(
  '/login',
  [ // Thêm validation cho login
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
