const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); // Thêm module 'path'
const cors = require('cors');
require('dotenv').config(); // Đảm bảo dòng này ở trên cùng

const app = express();

connectDB();
app.use(cors()); 
app.use(express.json({ extended: false })); // Cho phép server nhận dữ liệu JSON

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/foods', require('./routes/foods.js'));
app.use('/api/comments', require('./routes/comments.js')); // Kích hoạt lại route cho comments
app.use('/api/store', require('./routes/store.js'));
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 
