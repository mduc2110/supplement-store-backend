const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permissions'
    }]
});

module.exports = mongoose.model('roles', RoleSchema);