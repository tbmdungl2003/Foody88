const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Lấy giá trị của header Authorization (có dạng "Bearer [token]")
    const authHeader = req.header('Authorization');

    // 2. Kiểm tra nếu không có header (hoặc header rỗng)
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Tách chuỗi: ['Bearer', '[token]']
    const parts = authHeader.split(' ');
    
    // Kiểm tra định dạng: Phải có 2 phần và phần đầu tiên phải là "Bearer"
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Token format is invalid, must be "Bearer [token]"' });
    }

    // Lấy token thực tế (phần tử thứ 2)
    const actualToken = parts[1];

    // 4. Xác thực token
    try {
        // Xác minh chữ ký bằng khóa bí mật
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET); 

        // Gán payload đã giải mã vào req.user (hoặc tên biến bạn dùng)
        req.user = decoded.user; 
        
        next();
    } catch (err) {
        // Lỗi: Token hết hạn, chữ ký không hợp lệ, v.v.
        res.status(401).json({ msg: 'Token is not valid' });
    }
};