const mongoose = require('mongoose');

const { Schema } = mongoose;

const watchschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    brand_name:{
        type:String,
        required:true
    },
    model_name:{
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
    screen_size:{
        type:String,
        required:true
    },
    strap_band:{
        type:String,
        required:true
    }
});
const Watch = mongoose.model('watch', watchschema);
module.exports=Watch;