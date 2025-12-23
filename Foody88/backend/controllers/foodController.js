let FOOD_DATA_BY_LOCATION = require('../data/foodData.js'); // Dùng let để có thể thay đổi dữ liệu

const getFoods = async (req, res) => {
    try {

        res.json(FOOD_DATA_BY_LOCATION);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getFoodById = (req, res) => {

    const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
    const food = allItems.find(item => item._id === req.params.id);

    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};

// @route   POST api/foods
// @desc    Tạo một món ăn mới
// @access  Private (cần quyền admin)
const createFood = (req, res) => {
    const { name, price, address, image, description, city } = req.body;

    if (!name || !price || !city) {
        return res.status(400).json({ msg: 'Vui lòng nhập đủ Tên, Giá và Thành phố' });
    }

    // `city` từ frontend phải khớp với một key trong foodData (ví dụ: "Ha Noi", "Ho Chi Minh")
    if (!FOOD_DATA_BY_LOCATION[city]) {
        return res.status(404).json({ msg: `Thành phố '${city}' không tồn tại. Các thành phố hợp lệ: ${Object.keys(FOOD_DATA_BY_LOCATION).join(', ')}` });
    }

    const newFood = {
        _id: `food_${city.slice(0,2).toLowerCase()}_${Date.now()}`, // Tạo ID đơn giản
        name,
        price,
        address,
        image,
        description,
        comments: []
    };

    FOOD_DATA_BY_LOCATION[city].items.push(newFood);

    res.status(201).json(newFood);
};

// @route   PUT api/foods/:id
// @desc    Cập nhật một món ăn
// @access  Private (cần quyền admin)
const updateFood = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    let foodFound = false;

    for (const cityKey in FOOD_DATA_BY_LOCATION) {
        const cityData = FOOD_DATA_BY_LOCATION[cityKey];
        const itemIndex = cityData.items.findIndex(item => item._id === id);

        if (itemIndex !== -1) {
            // Cập nhật món ăn tại chỗ
            cityData.items[itemIndex] = { ...cityData.items[itemIndex], ...updatedData };
            foodFound = true;
            res.json(cityData.items[itemIndex]);
            break; 
        }
    }

    if (!foodFound) {
        res.status(404).json({ msg: 'Food not found' });
    }
};

// @route   DELETE api/foods/:id
// @desc    Xóa một món ăn
// @access  Private (cần quyền admin)
const deleteFood = (req, res) => {
    const { id } = req.params;
    let foodFound = false;

    for (const cityKey in FOOD_DATA_BY_LOCATION) {
        const cityData = FOOD_DATA_BY_LOCATION[cityKey];
        const originalLength = cityData.items.length;
        
        cityData.items = cityData.items.filter(item => item._id !== id);

        if (cityData.items.length < originalLength) {
            foodFound = true;
            break;
        }
    }

    if (foodFound) {
        res.json({ msg: 'Xóa món ăn thành công' });
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};

module.exports = { getFoods, getFoodById, createFood, updateFood, deleteFood };