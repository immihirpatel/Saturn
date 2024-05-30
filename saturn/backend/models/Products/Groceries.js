const mongoose = require('mongoose');

const { Schema } = mongoose;

const groceryschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    brand_name:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    customer_ratings:{
        type:Number,
        required:true
    },
    item_weight:{
        type:String,
        required:true
    },
    item_type:{
        type:String,
        required:true
    },
    nutritional_info:{
        type:String
    },
    pkg_info:{
        type:String,
        required:true
    }
});
const Grocery = mongoose.model('grocery', groceryschema);
module.exports=Grocery;