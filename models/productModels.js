const mongoose = require('mongoose');

const options =  new mongoose.Schema({
    opt: {
        type: String,
        required: true
    },
    quant: {
        type: Number,
        required: true
    }
}, {_id: false})

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    importPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    brand: {
        type: String
    },
    options: [options],
    urlProduct: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: [String]
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
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

module.exports = mongoose.model('products', ProductSchema);