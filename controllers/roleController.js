const Role = require('../models/roleModels');
const userController = require('./userController');

module.exports = {
    create: async (req, res) => {
        const {roleName, permissions} = req.body;
        try {
            const role = new Role({
                roleName,
                permissions
            });
            const savedRole = await role.save();
            res.status(201).json(savedRole);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getAll: async (req, res) => {
    },
    getOne: async (req, res) => {
        try {
            const {_id} = req.params;
            const role = await Role.findOne({
                _id
            })
            .populate({path: 'permissions'})
            .exec();
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    update: async (req, res) => {
    },
    remove: async (req, res) => {
    }
};