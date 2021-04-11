const mongoose = require('mongoose');

const DeliveryAddress = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
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
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('deliveryAddress', DeliveryAddress);