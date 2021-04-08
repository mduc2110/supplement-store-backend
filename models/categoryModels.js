const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    cateName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urlParam: {
        type: String,
        require: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('categories', CategorySchema);