
const Permission = require('../models/permissionModel');

module.exports = {
    create: async (req, res) => {
        const {permissionName} = req.body;
        try {
            const permission = new Permission({
                permissionName
            });
            const savedPermission = await permission.save();
            res.status(201).json(savedPermission);
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    getAll: async (req, res) => {
    },
    getOne: async (req, res) => {
    },
    update: async (req, res) => {
    },
    remove: async (req, res) => {
    }
};