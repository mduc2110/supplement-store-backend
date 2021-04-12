const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_code: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    products: [],
    total_amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ["PAYPAL", "COD"],
        default: "COD"
    },
    to_name: {
        type: String, required: true,
    },
    phone: {
        type: String, required: true,
    },
    address: {
        type: String, required: true
    },
    province: {
        id: {type: Number, required: true},
        name: {type: String, required: true}
    },
    district: {
        id: {type: Number, required: true},
        name: {type: String, required: true}
    },
    ward: {
        id: {type: Number, required: true},
        name: {type: String, required: true}
    },
    status: {
        type: String,
        enum: ["Submitted", "Cancelled", "Pending", "Shipping", "Done"],
        default: "Submitted"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('orders', OrderSchema);