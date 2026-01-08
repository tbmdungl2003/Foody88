const User = require('../models/User');
const { auth: firebaseAuth } = require('../config/firebase');
const jwt = require('jsonwebtoken');

/**
 * Xác thực ID token từ Firebase
 */
exports.verifyFirebaseToken = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ msg: 'ID token is required' });
    }

    // Xác thực token với Firebase
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;
    const displayName = decodedToken.name || '';

    // Kiểm tra user có tồn tại trong MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Tạo user mới nếu chưa tồn tại
      user = new User({
        username: displayName || email.split('@')[0],
        email,
        firebaseUid,
        authProvider: 'google',
        password: null,
      });
      await user.save();
    } else if (!user.firebaseUid) {
      // Cập nhật firebaseUid nếu user đã tồn tại nhưng chưa có UID
      user.firebaseUid = firebaseUid;
      user.authProvider = 'google';
      await user.save();
    }

    // Tạo JWT token cho backend
    const payload = {
      user: {
        id: user._id,
        firebaseUid,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.json({
      token,
      user: userToReturn,
      msg: 'Firebase authentication successful',
    });
  } catch (err) {
    console.error('Firebase verification error:', err);
    res.status(401).json({ msg: 'Invalid token or Firebase error' });
  }
};

/**
 * Đăng nhập bằng Google
 */
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ msg: 'ID token is required' });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;
    const displayName = decodedToken.name || '';
    const photoURL = decodedToken.picture || null;

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Nếu firebaseUid không tìm thấy, kiểm tra email
      user = await User.findOne({ email });

      if (!user) {
        // Tạo user mới
        user = new User({
          username: displayName || email.split('@')[0],
          email,
          firebaseUid,
          authProvider: 'google',
          password: null,
          avatar: photoURL,
        });
      } else {
        // Cập nhật user hiện tại
        user.firebaseUid = firebaseUid;
        user.authProvider = 'google';
        if (!user.avatar && photoURL) {
          user.avatar = photoURL;
        }
      }

      await user.save();
    } else {
      // Cập nhật avatar nếu có
      if (!user.avatar && photoURL) {
        user.avatar = photoURL;
        await user.save();
      }
    }

    // Tạo JWT token cho backend
    const payload = {
      user: {
        id: user._id,
        firebaseUid,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.json({
      token,
      user: userToReturn,
      msg: 'Google login successful',
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ msg: 'Google login failed' });
  }
};

/**
 * Đăng xuất (lấy từ Firebase)
 */
exports.firebaseLogout = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (idToken) {
      // Có thể revoke token Firebase nếu cần
      // await firebaseAuth.revokeRefreshTokens(decodedToken.uid);
    }

    res.json({ msg: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ msg: 'Logout failed' });
  }
};

/**
 * Lấy thông tin user hiện tại
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Kết nối tài khoản hiện tại với Firebase (Firebase Link)
 */
exports.linkFirebaseAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ msg: 'ID token is required' });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Kiểm tra nếu UID đã được liên kết với tài khoản khác
    const existingUser = await User.findOne({ firebaseUid });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ msg: 'This Firebase account is already linked to another account' });
    }

    user.firebaseUid = firebaseUid;
    user.authProvider = 'google';
    await user.save();

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.json({
      user: userToReturn,
      msg: 'Firebase account linked successfully',
    });
  } catch (err) {
    console.error('Link account error:', err);
    res.status(500).json({ msg: 'Failed to link Firebase account' });
  }
};
