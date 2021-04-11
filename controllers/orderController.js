const Order = require('../models/orderModel');
const fetch = require('node-fetch');
const axios = require('axios');
module.exports = {
    getAll: async (req, res) => {

    },
    getOne: async (req, res) => {

    },
    getAllByUser: async (req, res) => {

    },
    create: async (req, res) => {
        const {
            note,
            to_name,
            to_phone,
            to_address,
            to_ward_code,
            to_district_id,
            cod_amount,
            weight,
            service_type_id,
            service_id,
            items
        } = req.body;
        try {
            const response = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',{
                payment_type_id,
                note,
                required_note: "KHONGCHOXEMHANG",
                to_name,
                to_phone,
                to_address,
                to_ward_code,
                to_district_id,
                cod_amount,

                weight,
                length: 0,
                width: 0,
                height: 0,
                service_id,
                service_type_id,
                pick_shift: [2],
                items
            },
            {
                headers: {
                    "token" : process.env.GHN_TOKEN,
                    "Host" : process.env.HOST,
                    "Content-Type": "application/json",
                    "shop_id": process.env.SHOP_ID
                }
            });
            const responseData = response.data;
            const order = new Order({
                order_code: responseData.order_code,
                users: req.user._id,
                products,
                total_amount
            });
            // const savedOrder = order.save();
            res.status(201).json(responseData);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                "token" : process.env.GHN_TOKEN,
                "Host" : process.env.HOST,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {

        })
    },
    update: async (req, res) => {

    },
    remove: async (req, res) => {

    },
    getServices: async (req, res) => {
        
        try {
            const cfg = {
                method: 'post',
                url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
                headers: { 
                    'Host': 'dev-online-gateway.ghn.vn', 
                    'token': '7d2d8d4e-9370-11eb-8be2-c21e19fc6803',
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify(
                    {
                        "shop_id": parseInt(process.env.SHOP_ID),
                        "from_district": 1442,
                        "to_district": parseInt(req.params.districtId)
                })
            }
            const response = await axios(cfg);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}