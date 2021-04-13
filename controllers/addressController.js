const axios = require('axios');
const fetch = require('node-fetch');
module.exports = {
    getProvince: async (req, res) => {
        try {
            const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    "token" : process.env.GHN_TOKEN,
                    "Host" : process.env.HOST
                }
            });
            res.status(200).json(response.data.data);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        // fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', { 
        //     method: 'GET', 
        //     headers: {
        //         "token" : process.env.GHN_TOKEN,
        //         "Host" : process.env.HOST
        //     }
        // }).then(res => res.json())
        // .then(json => res.status(200).json(json.data));
    },
    getDistrict: async (req, res) => {
        await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', { 
            method: 'POST',
            body: JSON.stringify({
                province_id: parseInt(req.params.province_id)
            }),
            headers: {
                "token" : process.env.GHN_TOKEN,
                "Host" : process.env.HOST,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(json => {
            // const filteredAddress = json.data.filter(item => item.ProvinceID == req.params.province_id);
            res.status(json.code).json(json.data)
        })
        .catch(err => res.status(200).json({message: err.message}));
    },
    getWard: async (req, res) => {
        await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', { 
            method: 'POST',
            body : JSON.stringify({
                "district_id": parseInt(req.params.district_id)
            }),
            headers: {
                "token" : process.env.GHN_TOKEN,
                "Host" : process.env.HOST,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(json => {
            // const filteredWard = json.data.filter(item => item.DistrictID == req.params.district_id);
            res.status(json.code).json(json.data)
        })
        .catch(err => res.status(200).json({message: err.message}));
        // res.status(200).json(response);
        // console.log(response);
    }
}