const mongoose = require('mongoose');

const { Schema } = mongoose;

const categoryschema = new Schema({
    categoryname: {
        type:String,
        required:true
    }
});
const Category = mongoose.model('category', categoryschema);
module.exports=Category;