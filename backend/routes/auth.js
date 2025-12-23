const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { register, login, getLoggedInUser, updateUserProfile, getAllUsers, deleteUser } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/auth.js');
const { check } = require('express-validator');
const storage = multer.diskStorage({
  destination: './uploads/', // Thư mục lưu file
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Giới hạn kích thước file 2MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Chỉ cho phép tải lên file ảnh!');
    }
  },
}).single('avatar'); // 'avatar' là tên của field trong form-data

router.get('/', authMiddleware, getLoggedInUser);
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
router.post(
  '/login',
  [ 
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

router.put('/profile', authMiddleware, upload, updateUserProfile);

// Routes dành cho Admin quản lý User
router.get('/users', authMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
