const express = require('express')
const router = express.Router()
const Orderdetail = require('../models/Orderdetail')
//const fetchuser = require('../middleware/fetchuser')
const fetchorder = require('../middleware/fetchorder')
const fetchcart = require('../middleware/fetchcart')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const fetchproduct = require('../middleware/fetchproduct')

//Place order: basically adding order details which contains authorized user details and product which he/she bought 
router.post('/placeorderdetails',fetchorder,fetchproduct, async(req,res)=>{
    const {qty,total,fullfillment_status,return_status} = req.body
    let orderdetail
        orderdetail = new Orderdetail({
            qty,total,fullfillment_status,return_status,order:req.order.id,product:req.product.id
        }) 
    const saveorder = await orderdetail.save()
    res.json(saveorder)
})


//FOLLOWING PART: TO DO

//Get order: Printing the details of order of authorized user
router.post('/getorderdetails',fetchorder, async(req,res)=>{
    const orderdetail = await Orderdetail.find({order:req.order.id})
    res.json(orderdetail)
})

//Update order: updating the status of order (FOR ADMIN PURPOSE and ONLY STATUS CAN BE UPDATED)
//TO DO: change the field name as per new modifications 
router.post('/updateorderdetails/:id', async(req,res)=>{
    const{fullfillment_status,return_status} = req.body
   
    let orderdetails = await Orderdetail.findById(req.params.id)
    if(!orderdetails){
        return res.status(500).json({error:"order not found"})
    }
    order = await Orderdetail.findByIdAndUpdate(req.params.id, {$set:{fullfillment_status:fullfillment_status,return_status:return_status}},{new:true})
    res.json(order)
})

//Cancel order: Cancel the order..

router.post('/deleteorderdetails/:id',async(req,res)=>{
    const order = await Orderdetail.findByIdAndDelete(req.params.id)
    res.json("Order deleted successfully")
})
module.exports = router