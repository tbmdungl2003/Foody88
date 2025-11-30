const express = require('express');
const router = express.Router();
const {getStoreInformation}=require('../controllers/storeController.js');
console.log("abc");
router.get('/',getStoreInformation);
module.exports = router;