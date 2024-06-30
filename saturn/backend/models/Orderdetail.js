const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderdetailschema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    fullfillment_status: {
        type: String,
        required: true
    },
    return_status: {
        type: String,
        required: true
    }
});
const Orderdetail = mongoose.model('orderdetail', orderdetailschema);
module.exports = Orderdetail;









