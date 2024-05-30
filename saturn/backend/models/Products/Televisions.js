const mongoose = require('mongoose');

const { Schema } = mongoose;

const televisionschema = new Schema({
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
    connectivity:{
        type:String,
        required:true
    },
    audio_features:{
        type:String,
        required:true
    }

});
const Television = mongoose.model('television', televisionschema);
module.exports=Television;