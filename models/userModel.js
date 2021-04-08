const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    avatarUrl: {
        type: String
    },
    roles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    },
    active: {
        type: Boolean,
        required: true
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


module.exports = mongoose.model('users', UserSchema);