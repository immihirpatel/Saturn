const mongoose = require('mongoose');

const { Schema } = mongoose;

const clothschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    size:{
        type:String,
        required:true
    },
    fabric_type:{
        type:String,
        required:true
    },
    country_of_origin:{
        type:String,
        required:true
    },
    neck_style:{
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
    color:{
        type:String,
        required:true
    },
    item_type:{
        type:String,
        required:true
    }
});
const Cloth = mongoose.model('cloth', clothschema);
module.exports=Cloth;