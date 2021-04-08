const express = require('express');
const routes = express.Router();
const {create, getAll, getOne, update, remove} = require('../controllers/permissionController')

routes.get('/', getAll);
routes.get('/:_id', getOne);
routes.post('/', create);
routes.delete('/:_id', remove);
routes.patch('/', update);

module.exports = routes;