const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const fetchuser = require('../middleware/fetchuser')
const fetchproduct = require('../middleware/fetchproduct')


router.post('/addtocart',fetchuser,fetchproduct, async(req,res)=>{
        const cartItem = await Cart.findOne({product:req.product.id})
        let qty = 1
       // console.log(cartItem.product?._id)
        
        if(!cartItem){
            
            const cart = new Cart({
                qty:qty,user:req.user.id,product:req.product.id,total:req.body.total
            })
            const savecart = await cart.save()
            res.json(savecart)
        }
        else{
            
            qty = cartItem.qty + 1
            //const updatedTotal = req.body.total * updatedQty
            const cart =  await Cart.findByIdAndUpdate(cartItem,{qty,total:req.body.total*qty},{new:true})
           // const savecart = await cart.save()
            res.json(cart)
        }
    
    
})
router.post('/viewcart',fetchuser,async(req,res)=>{
    const cart = await Cart.find({user:req.user.id}).populate('product')
    res.json(cart)
})

router.put('/updatecart/:id',fetchuser,async(req,res)=>{
    const user = await Cart.find({user:req.user.id})
    const cart = await Cart.findById(req.params.id)
    const {qty,total} = req.body
    const updatedcart = {}
    if(qty){updatedcart.qty=qty}
    if(total){updatedcart.total =total}
    if(!cart){
        return res.json("No items found in cart")
    }

    const newcart = await Cart.findByIdAndUpdate(req.params.id, {$set:updatedcart},{new:true})
    res.json({newcart})
})
router.post('/deletecart/:id',fetchuser,async(req,res)=>{
    const user = await Cart.find({user:req.user.id})
    const cart = await Cart.findByIdAndDelete(req.params.id)
    res.json("Item deleted successfully")
})


module.exports = router 