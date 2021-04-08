const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    permissionName: {
        type: String,
        required: true,  
    }
});
module.exports = mongoose.model('permissions', PermissionSchema);