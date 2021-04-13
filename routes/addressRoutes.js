const express = require('express');
const { getDistrict, getProvince, getWard} = require('../controllers/addressController');
const routes = express.Router();


routes.get('/province', getProvince);
routes.get('/district/:province_id', getDistrict);
routes.get('/ward/:district_id', getWard);

module.exports = routes;