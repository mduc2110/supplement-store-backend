const express= require('express');
const {
    getAll,
    getOne, 
    create, 
    remove, 
    update,
    getAllByUser,
    createOrder
} = require('../controllers/orderController');
const {userAuth, orderRoles} = require('../middlewares/checkAuth');
const routes = express.Router();

routes.get('/', orderRoles, getAll);
routes.get('/orders',userAuth,  getAllByUser);
routes.get('/:order_code', getOne);
routes.post('/', userAuth, create);
routes.post('/order-create', orderRoles, createOrder);
routes.delete('/:order_code',orderRoles, remove);
routes.patch('/',orderRoles, update);

module.exports = routes;