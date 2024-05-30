const mongoose = require('mongoose');

const { Schema } = mongoose;

const mobileschema = new Schema({
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
    varient1:{
        type:String,
        required:true
    },
    varient2:{
        type:String,
        required:true
    },
    front_camera:{
        type:String,
        required:true
    },
    back_camera:{
        type:String,
        required:true
    },
    OS:{
        type:String,
        required:true
    }
});
const Mobile = mongoose.model('mobile', mobileschema);
module.exports=Mobile;