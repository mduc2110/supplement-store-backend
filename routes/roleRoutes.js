const express = require('express');
const { create, getAll, getOne, update, remove } = require('../controllers/roleController');
const { adminAuth } = require('../middlewares/checkAuth')
const routes = express.Router();

routes.get('/', adminAuth, getAll);
routes.get('/:_id', adminAuth, getOne);
routes.post('/', adminAuth, create);
routes.delete('/:_id', adminAuth, remove);
routes.patch('/', adminAuth, update);

module.exports = routes;