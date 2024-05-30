const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookschema = new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    release_date:{
        type:String,
        required:true
    },
    publisher_name:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    item_weight:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    customer_ratings:{
        type:Number,
        required:true
    }
});
const Book = mongoose.model('book', bookschema);
module.exports=Book;