const admin = require('firebase-admin');
const path = require('path');

// Khởi tạo Firebase Admin SDK
// Lưu ý: Bạn cần tải file serviceAccountKey.json từ Firebase Console
// Đặt nó trong thư mục config hoặc sử dụng environment variable
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  admin,
  auth,
  db,
};
