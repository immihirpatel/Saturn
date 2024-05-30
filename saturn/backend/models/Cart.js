const mongoose = require('mongoose')
const { Schema } = mongoose;

const cartschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    qty:{
        type:Number
    },
    total:{
        type:Number,
        required:true,
        default:0
    }
});
const Cart = mongoose.model('cart', cartschema);
module.exports=Cart;