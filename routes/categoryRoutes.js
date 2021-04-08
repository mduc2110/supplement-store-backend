const express = require('express');
const { create, getAll, getOne, update, remove } = require('../controllers/categoryController');
const {} = require('../middlewares/checkAuth');
const routes = express.Router();

routes.get('/', getAll);
routes.get('/:urlParam', getOne);
routes.post('/', create);
routes.delete('/:urlParam', remove);
routes.patch('/', update);

module.exports = routes;