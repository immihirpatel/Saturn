const mongoose = require('mongoose');

const { Schema } = mongoose;

const subcategoryschema = new Schema({
    subcategoryname: {
        type:String,
        require:true
    }
});
const Subcategory = mongoose.model('Subcategory', subcategoryschema);
module.exports=Subcategory;