// controllers/cartController.js

const { sql } = require('../config/db');

// Obtener todos los productos en el carrito de un usuario
const getCartItems = async (req, res) => {
    const userId = req.params.userId; // Obtener el userId desde los parámetros
    try {
        const result = await sql.query`
      SELECT c.id, c.quantity, p.name, p.price
      FROM Cart c
      JOIN Products p ON c.product_id = p.id
      WHERE c.user_id = ${userId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: err });
    }
};

// Agregar un producto al carrito
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await sql.query`
      INSERT INTO Cart (user_id, product_id, quantity)
      VALUES (${userId}, ${productId}, ${quantity})`;
        res.json({ message: 'Producto agregado al carrito' });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar al carrito', error: err });
    }
};

// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
    const cartId = req.params.cartId; // Obtener el cartId desde los parámetros
    try {
        await sql.query`DELETE FROM Cart WHERE id = ${cartId}`;
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar del carrito', error: err });
    }
};

module.exports = { getCartItems, addToCart, removeFromCart };
