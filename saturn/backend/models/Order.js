const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart'
    },
    order_status:{
        type:String,
        required:true
    },
    order_date:{
        type:Date,
        default: Date.now
    },
    shipping_address: {
        type:String,
        required:true
    },
    billing_address: {
        type:String,
        required:true
    },
    payment_method: {
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    total_amount: {
        type:Number,
        required:true
    },
    shipping_method: {
        type:String,
        required:true
    },
    shipping_cost: {
        type:Number,
        required:true
    },
    tracking_number: {
        type:String,
        required:true
    },
    payment_status: {
        type:String,
        required:true
    },
    fullfillment_status: {
        type:String,
        required:true
    },
    return_status: {
        type:String,
        required:true
    }
});
const Order = mongoose.model('order', orderschema);
module.exports=Order;