const express= require('express');
const {
    getAll,
    getOne, 
    create, 
    remove, 
    update,
    getAllByUser,
    getServices,
    createOrder
} = require('../controllers/orderController');
const {userAuth, adminAuth, orderRoles} = require('../middlewares/checkAuth');
const routes = express.Router();

routes.get('/', orderRoles, getAll);
routes.get('/orders',userAuth,  getAllByUser);
routes.get('/:order_code', getOne);
routes.post('/', userAuth, create);
routes.post('/order-create', orderRoles, createOrder);
routes.delete('/:order_code', remove);
routes.patch('/', update);

module.exports = routes;