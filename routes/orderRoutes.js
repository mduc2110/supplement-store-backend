const express= require('express');
const {
    getAll,
    getOne, 
    create, 
    remove, 
    update,
    getAllByUser,
    getServices
} = require('../controllers/orderController');
const {userAuth, adminAuth} = require('../middlewares/checkAuth');
const routes = express.Router();

routes.get('/', getAll);
routes.get('/available-services/:districtId', getServices);
routes.get('/orders',userAuth,  getAllByUser);
routes.get('/:order_code', getOne);
routes.post('/', create);
routes.delete('/:order_code', remove);
routes.patch('/', update);

module.exports = routes;