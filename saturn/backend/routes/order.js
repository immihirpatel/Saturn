const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const fetchuser = require('../middleware/fetchuser')
const fetchproduct = require('../middleware/fetchproduct')
const fetchcart = require('../middleware/fetchcart')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const stripe = require("stripe")("sk_test_51QS3fkRpvZEOPvzh8f23kYq6bY0oEMXmaWKEJ4i7ToqaBH8xiDXAUJ7xM82SKbPOiZVLzPiFn3UAJEuHwceRkyJJ00zXmNZYoE")

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


//create checkout session for stripe
router.post('/create-checkout-session',async(req,res)=>{
    const {products} = req.body;
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"cad",
            product_data:{
                name:product.product.title
            },
            unit_amount:Math.round(Number(product.total) * 100)
        },
        quantity:product.qty
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:8080/success",
        cancel_url:"http://localhost:8080/cancel"
    })
    // const lineItems = products.map((product)=>({
    //     price_data:{
    //         currency:"cad",
    //         product_data:{
    //             name:product.product.name
    //         },
    //         unit_amount:product.product.price
    //     },
    //     quantity:product.qty
    // }));
    
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_type:["card"],
    //     line_items:lineItems,
    //     mode:"payment",
    //     success_url:"http://localhost:8080/success",
    //     cancel_url:"http://localhost:8080/cancel"
    // })

    res.json({id:session.id})
    // console.log(session)
})
module.exports = router