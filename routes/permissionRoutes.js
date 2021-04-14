const express = require('express');
const routes = express.Router();
const {create, getAll, getOne, update, remove} = require('../controllers/permissionController')
const { adminAuth } = require('../middlewares/checkAuth')
routes.get('/',adminAuth, getAll);
routes.get('/:_id',adminAuth, getOne);
routes.post('/',adminAuth, create);
routes.delete('/:_id',adminAuth, remove);
routes.patch('/',adminAuth, update);

module.exports = routes;