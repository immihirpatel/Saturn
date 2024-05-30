const mongoose = require('mongoose');

const { Schema } = mongoose;

const headphoneschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    brand_name:{
        type:String
    },
    model_name:{
        type:String
    },
    customer_ratings:{
        type:Number
    },
    color:{
        type:String
    },
    form_factor:{
        type:String
    },
    connectivity_technology:{
        type:String
    },
    controls:{
        type:String
    },
    battery_information:{
        type:String
    },
    audio_features:{
        type:String
    }
});
const Headphone = mongoose.model('headphone', headphoneschema);
module.exports=Headphone;