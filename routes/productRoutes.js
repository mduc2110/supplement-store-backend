const express = require("express");
const { create, getAll, getOne, update, remove } = require("../controllers/productController");
const { adminAuth, userAuth, productRoles } = require('../middlewares/checkAuth');
const uploadMulter = require('../middlewares/uploads.js');

const routes = express.Router();

routes.get('/', getAll);
routes.get('/:_id', getOne);
routes.post('/', productRoles, uploadMulter, create);
routes.delete('/:_id', productRoles, remove);
routes.patch('/', productRoles, update);

module.exports = routes;