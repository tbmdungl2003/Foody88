const FOOD_DATA_BY_LOCATION = require('../data/foodData.js'); // Đường dẫn đã đúng

const getFoods = async (req, res) => {
    try {
       // Chuyển đổi đối tượng thành mảng các cặp [key, value]
        const transformedData = Object.fromEntries(
            Object.entries(FOOD_DATA_BY_LOCATION).map(([locationKey, locationData]) => {
                // 1. Với mỗi địa điểm, tạo một mảng 'items' mới đã được biến đổi
                const transformedItems = locationData.items.map(item => ({
                    ...item, // Giữ lại tất cả các thuộc tính cũ của item
                    _id: String(item.id) // Thêm thuộc tính _id
                }));
                
                // 2. Trả về một cặp [key, value] mới, với mảng 'items' đã được cập nhật
                return [locationKey, { ...locationData, items: transformedItems }];
            })
        );
        res.json(transformedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getFoodById = (req, res) => {
    const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
    const food = allItems.find(item => String(item.id) === req.params.id);

    if (food) {
        const foodCopy = { ...food, _id: String(food.id) };
        res.json(foodCopy);
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};

module.exports = { getFoods, getFoodById };