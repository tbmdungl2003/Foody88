const STORE_DATA=require('../data/storeData.js')
const getStoreInformation=async(req,res)=>{

    const result=Object.entries(STORE_DATA);
    console.log(result);
    res.json(STORE_DATA);
}
module.exports={getStoreInformation}