const express = require("express");
const { create, getAll, getOne, update, remove } = require("../controllers/productController");
const { adminAuth, userAuth, productRoles } = require('../middlewares/checkAuth');
const { uploadMultiple, uploadSingle } = require('../middlewares/uploads.js');

const routes = express.Router();

routes.get('/', getAll);
routes.get('/:urlProduct', getOne);
routes.post('/', productRoles, uploadMultiple, create);
routes.delete('/:_id', productRoles, remove);
routes.patch('/', productRoles, update);

// routes.post('/test', uploadMultiple, (req, res) => {
//     try {
//         res.status(200).json(req.files);
        
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

module.exports = routes;

