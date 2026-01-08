const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo mỗi email là duy nhất
  },
  password: {
    type: String,
    default: null, // Có thể null nếu đăng nhập bằng Firebase/OAuth
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true, // Cho phép multiple null values
    default: null,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'firebase'],
    default: 'local',
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  introduction: {
    type: String,
  },
  avatar: {
    type: String, 
    default: null,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model('user', UserSchema);
