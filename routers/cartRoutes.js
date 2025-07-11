// routers/cartRoutes.js

const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, removeFromCart } = require('../controllers/cartController');

// Ruta para obtener los productos del carrito de un usuario
router.get('/:userId', getCartItems);

// Ruta para agregar un producto al carrito
router.post('/', addToCart);

// Ruta para eliminar un producto del carrito
router.delete('/:cartId', removeFromCart);

module.exports = router;
