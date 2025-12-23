const express = require('express');
const router = express.Router();
const {getStoreInformation, getStoreById, createStore, updateStore, deleteStore}=require('../controllers/storeController.js');

router.get('/',getStoreInformation);
router.get('/:id', getStoreById); 
router.post('/', createStore);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);
module.exports = router;