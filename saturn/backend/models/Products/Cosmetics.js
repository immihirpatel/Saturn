const mongoose = require('mongoose');

const { Schema } = mongoose;

const cosmeticschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    brand_name:{
        type:String,
        required:true
    },
    item_type:{
        type:String,
        required:true
    },
    item_weight:{
        type:String,
        required:true
    },
    customer_ratings:{
        type:Number,
        required:true
    },
    color:{
        type:String
    }
    
});
const Cosmetic = mongoose.model('cosmetic', cosmeticschema);
module.exports=Cosmetic;