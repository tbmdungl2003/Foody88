let STORE_DATA=require('../data/storeData.js')
const getStoreInformation=async(req,res)=>{
    const allStores = Object.values(STORE_DATA).flatMap(province => province.items);
    res.json(allStores);
}

const getStoreById = async (req, res) => {
    const { id } = req.params;
    // Tìm kiếm cửa hàng trong tất cả các tỉnh
    const allStores = Object.values(STORE_DATA).flatMap(province => province.items);
    const store = allStores.find(s => s.id === id);
    
    if (store) {
        res.json(store);
    } else {
        res.status(404).json({ message: "Store not found" });
    }
};

// @route   POST api/store
// @desc    Tạo cửa hàng mới
const createStore = (req, res) => {
    const { name, address, image, description, city } = req.body;

    if (!name || !city) {
        return res.status(400).json({ msg: 'Vui lòng nhập tên và thành phố' });
    }

    if (!STORE_DATA[city]) {
        return res.status(404).json({ msg: `Thành phố '${city}' không tồn tại.` });
    }

    const newStore = {
        id: `store_${city.slice(0,2).toLowerCase()}_${Date.now()}`,
        name,
        address,
        image,
        description
    };

    STORE_DATA[city].items.push(newStore);
    res.status(201).json(newStore);
};

// @route   PUT api/store/:id
// @desc    Cập nhật cửa hàng
const updateStore = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    let storeFound = false;

    for (const cityKey in STORE_DATA) {
        const cityData = STORE_DATA[cityKey];
        const itemIndex = cityData.items.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            cityData.items[itemIndex] = { ...cityData.items[itemIndex], ...updatedData };
            storeFound = true;
            res.json(cityData.items[itemIndex]);
            break;
        }
    }
    if (!storeFound) res.status(404).json({ msg: 'Store not found' });
};

// @route   DELETE api/store/:id
// @desc    Xóa cửa hàng
const deleteStore = (req, res) => {
    const { id } = req.params;
    let storeFound = false;

    for (const cityKey in STORE_DATA) {
        const cityData = STORE_DATA[cityKey];
        const originalLength = cityData.items.length;
        cityData.items = cityData.items.filter(item => item.id !== id);
        if (cityData.items.length < originalLength) {
            storeFound = true;
            break;
        }
    }
    if (storeFound) res.json({ msg: 'Store deleted' });
    else res.status(404).json({ msg: 'Store not found' });
};

module.exports={getStoreInformation, getStoreById, createStore, updateStore, deleteStore}