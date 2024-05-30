const Product = require('../models/Product')
const fetchproduct = async(req,res,next)=>{
    const id = req.header('productid')   
    if(!id){
        return res.status(500).json({error:"Unauthorized access"})
    }
    try{
    const product =await Product.findById(id)
    req.product = product
    next()
    }
    catch(error){
        res.status(500).json({error:"something went wrong"})
    }
}
module.exports = fetchproduct