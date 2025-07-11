// models/cartModel.js

const { sql } = require('../config/db');

// Obtener todos los productos del carrito para un usuario
const getCartItems = async (userId) => {
    try {
        const result = await sql.query`
      SELECT c.id, c.quantity, p.name, p.price
      FROM Cart c
      JOIN Products p ON c.product_id = p.id
      WHERE c.user_id = ${userId}`;
        return result.recordset;
    } catch (err) {
        throw new Error('Error al obtener los productos del carrito');
    }
};

// Agregar un producto al carrito
const addToCart = async (userId, productId, quantity) => {
    try {
        await sql.query`
      INSERT INTO Cart (user_id, product_id, quantity)
      VALUES (${userId}, ${productId}, ${quantity})`;
    } catch (err) {
        throw new Error('Error al agregar al carrito');
    }
};

// Eliminar un producto del carrito
const removeFromCart = async (cartId) => {
    try {
        await sql.query`DELETE FROM Cart WHERE id = ${cartId}`;
    } catch (err) {
        throw new Error('Error al eliminar del carrito');
    }
};

module.exports = { getCartItems, addToCart, removeFromCart };
