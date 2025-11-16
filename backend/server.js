const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config(); // Đảm bảo dòng này ở trên cùng

const app = express();

// Kết nối Database
connectDB();

// Middlewares
app.use(cors()); // Cho phép cross-origin requests
app.use(express.json({ extended: false })); // Cho phép server nhận dữ liệu JSON

// Định nghĩa Routes
// Tất cả các route trong './routes/auth' sẽ có tiền tố là '/api/auth'
app.use('/api/auth', require('./routes/auth.js'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
