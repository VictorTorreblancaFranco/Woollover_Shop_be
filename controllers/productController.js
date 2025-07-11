// controllers/productController.js

const { sql } = require('../config/db');

// Obtener todos los productos
const getAllProductsController = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los productos', error: err });
    }
};

// Obtener un producto por su ID
const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Products WHERE id = ${id}`;
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el producto', error: err });
    }
};

// Agregar un nuevo producto
const addProductController = async (req, res) => {
    const { name, description, price, status, image } = req.body;
    try {
        await sql.query`
      INSERT INTO Products (name, description, price, status, image)
      VALUES (${name}, ${description}, ${price}, ${status}, ${image})`;
        res.json({ message: 'Producto agregado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar el producto', error: err });
    }
};

module.exports = { getAllProductsController, getProductByIdController, addProductController };
