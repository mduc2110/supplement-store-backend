const express = require('express');
const { create, getAll, getOne, update, remove } = require('../controllers/categoryController');
const {categoryRoles} = require('../middlewares/checkAuth');
const routes = express.Router();

routes.get('/', getAll);
routes.get('/:urlParam', getOne);
routes.post('/',categoryRoles, create);
routes.delete('/:urlParam',categoryRoles, remove);
routes.patch('/', categoryRoles, update);

module.exports = routes;