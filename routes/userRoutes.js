const express = require("express");
const { login ,create, getAll, getOne, update, } = require("../controllers/userController");
const {adminAuth, userAuth} = require('../middlewares/checkAuth');

const routes = express.Router();

routes.post('/login', login);
routes.post('/', create);
routes.get('/', getAll);
routes.get('/:_id', userAuth, getOne);
// routes.delete('/:_id', remove);
routes.patch('/', userAuth, update);

module.exports = routes;