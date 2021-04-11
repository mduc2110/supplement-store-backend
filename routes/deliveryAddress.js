const express = require('express');
const { userAuth } = require('../middlewares/checkAuth');
const DeliveryAddress = require('../models/deliveryAddress');
const routes = express.Router();

routes.post('/', userAuth, async (req, res) => {
    const {
        to_name,
        phone,
        address,
        province,
        district,
        ward
    } = req.body;
    try {
        const de = new DeliveryAddress({
            users: req.user._id,
            to_name,
            phone,
            address,
            province,
            district,
            ward
        });
        const saved = await de.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
routes.get('/', userAuth, async (req, res) => {
    try {
        const de = await DeliveryAddress.find({
            users: req.user._id
        })
        res.status(201).json(de);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = routes;