const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const fetchuser = require('../middleware/fetchuser')
const fetchproduct = require('../middleware/fetchproduct')
const fetchcart = require('../middleware/fetchcart')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

//Place order: basically adding order details which contains authorized user details and product which he/she bought 
router.post('/placeorder',fetchuser, async(req,res)=>{
    const {order_status,shipping_address,billing_address,payment_method,shipping_method,shipping_cost,tracking_number,payment_status,total_amount} = req.body
    //const cart = req.cart.id
    //const productid = req.product.id
    //const product = await Product.findById(productid)
   // const cart_item = await Cart.findById(cart).populate('product')
    //const total = cart_item.product.price * cart_item.qty
    let order

        order = new Order({
            total_amount,order_status,shipping_address,billing_address,payment_method,shipping_method,payment_status,shipping_cost,tracking_number,user:req.user.id
        }) 
    
    const saveorder = await order.save()
    res.json(saveorder.id)
})

//Get order: Printing the details of order of authorized user
router.post('/getorder',fetchuser, async(req,res)=>{
    const order = await Order.find({user:req.user.id})
    res.json(order)
})

//Update order: updating the status of order (FOR ADMIN PURPOSE and ONLY STATUS CAN BE UPDATED)
//TO DO: change the field name as per new modifications 
router.post('/updateorder/:id', async(req,res)=>{
    const {status} = req.body
   
    let order = await Order.findById(req.params.id)
    if(!order){
        return res.status(500).json({error:"order not found"})
    }
    order = await Order.findByIdAndUpdate(req.params.id, {$set:{status:status}},{new:true})
    res.json(order)
})

//Cancel order: Cancel the order..

router.post('/deleteorder/:id',async(req,res)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    res.json("Order deleted successfully")
})
module.exports = router