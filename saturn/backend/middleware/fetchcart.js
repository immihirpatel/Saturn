const Cart = require('../models/Cart')
const fetchcart = async(req,res,next)=>{
    const id = req.header('cartid')   
    if(!id){
        return res.status(500).json({error:"Unauthorized access"})
    }
    try{
    const cart =await Cart.findById(id)
    req.cart = cart
    next()
    }
    catch(error){
        res.status(500).json({error:"something went wrong"})
    }
}
module.exports = fetchcart