const Order = require('../models/orderModel');
const axios = require('axios');
const Product = require('../models/productModels');


module.exports = {
    getAll: async (req, res) => {
        try {
            const allOrders = await Order.find();
            res.status(200).json(allOrders);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getOne: async (req, res) => {

    },
    getAllByUser: async (req, res) => {
        try {
            const orders = await Order.find({
                users: req.user._id
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    create: async (req, res) => {
        const {
            payment_method,
            note,
            to_name,
            phone,
            address,
            ward,
            district,
            province,
            total_amount,
            items
        } = req.body;
        try {
            const order = new Order({
                users: req.user._id,
                total_amount,
                payment_method,
                to_name, phone, address,
                province, district, ward,
                status: "Pending",
                note,
                items
            });
            const savedOrder = await order.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
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
    },
    createOrder: async (req, res) => {
        // res.status(200).json(req.body);
        try {
            const {
                _id,
                note,
                to_name,
                to_phone,
                to_address,
                to_ward_code,
                to_district_id,
                total_amount,
                items
            } = req.body;
            console.log()
            const response = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',JSON.stringify({
                shop_id: process.env.SHOP_ID,
                payment_type_id: 2,
                note,
                required_note: "KHONGCHOXEMHANG",
                to_name,
                to_phone,
                to_address,
                to_ward_code: to_ward_code.toString(),
                to_district_id,
                cod_amount: total_amount,

                weight: 3000,
                length: 0,
                width: 0,
                height: 0,
                service_id: 53320,
                service_type_id: 1,
                pick_shift: [
                    2
                ],
                items: items.map(item => {
                    return {
                        quantity: item.quantity,
                        name: item.name,
                        code: item.code,
                        category: item.category
                    }
                })
            }),
            {
                headers: {
                    "token" : process.env.GHN_TOKEN,
                    "Host" : process.env.HOST,
                    "Content-Type": "application/json",
                    "shop_id": process.env.SHOP_ID
                }
            });
            console.log(_id);
            const updatedOrder = await Order.updateOne({_id}, {
                status: "Shipping"
            });
            console.log(updatedOrder);
            // if(response.data.message === 'Success'){
            //     items.forEach(async element =>  {
            //         console.log(element);
            //         const prd = await Product.findOne({
            //                 _id: element._id
            //             }
            //         );
            //         let modifiedQuant = 0;
            //         prd.options.forEach(opt => {
            //             console.log(opt.flavour + element.options);
            //             if(opt.flavour === element.options){
            //                 modifiedQuant = opt.quant - element.quantity
            //             }
            //         });
            //         console.log(modifiedQuant);
            //         await Product.updateOne(
            //             {
            //                 _id: element._id, 
            //                 'options.flavour': element.options
            //             },{
            //                 'options.quant' : modifiedQuant
            //             }
            //         );
            //     });
            // }
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({message: error.message}); 
        }
    }
}

// eLw.4d5nSg4WKz!

