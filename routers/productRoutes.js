// routers/productRoutes.js

const express = require('express');
const router = express.Router();
const { getAllProductsController, getProductByIdController, addProductController } = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/', getAllProductsController);

// Ruta para obtener un producto por su ID
router.get('/:id', getProductByIdController);

// Ruta para agregar un nuevo producto
router.post('/', addProductController);

module.exports = router;
