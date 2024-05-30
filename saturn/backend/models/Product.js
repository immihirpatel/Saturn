const mongoose = require('mongoose');

const { Schema } = mongoose;

const productschema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategory'
    }

});
const Product = mongoose.model('product', productschema);
module.exports = Product;