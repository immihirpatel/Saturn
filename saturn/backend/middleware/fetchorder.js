const Order = require('../models/Order')
const fetchorder = async(req,res,next)=>{
    const id = req.header('orderid')   
    if(!id){
        return res.status(500).json({error:"Unauthorized access"})
    }
    try{
    const order =await Order.findById(id)
    req.order = order
    next()
    }
    catch(error){
        res.status(500).json({error:"something went wrong"})
    }
}
module.exports = fetchorder