const mongoose = require('mongoose')
const { Schema } = mongoose;

const cardschema = new Schema({
    name: {
        type:String,
        require:true
    },
    cardnumber:{
        type:String,
        require:true
    },
    expdate:{
        type:String,
        require:true
    },
    cvv:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
const Card = mongoose.model('card', cardschema);
module.exports=Card;