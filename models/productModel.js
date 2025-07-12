// models/productModel.js

const { sql } = require('../config/db'); // Importamos la conexión a la base de datos

// Obtener todos los productos
const getAllProducts = async () => {
    try {
        // Consultamos todos los productos
        const result = await sql.query('SELECT * FROM Products');
        return result.recordset; // Devuelve todos los productos obtenidos de la base de datos
    } catch (err) {
        throw new Error('Error al obtener los productos: ' + err.message); // Manejo de errores
    }
};

// Obtener un producto por su ID
const getProductById = async (id) => {
    try {
        // Consultamos un producto por su ID
        const result = await sql.query`SELECT * FROM Products WHERE id = ${id}`;
        return result.recordset[0]; // Retorna el primer producto encontrado
    } catch (err) {
        throw new Error('Error al obtener el producto: ' + err.message); // Manejo de errores
    }
};

// Agregar un nuevo producto
const addProduct = async (name, description, price, status, image) => {
    try {
        // Insertamos un nuevo producto en la base de datos
        await sql.query`
      INSERT INTO Products (name, description, price, status, image)
      VALUES (${name}, ${description}, ${price}, ${status}, ${image})
    `;
        return { message: 'Producto agregado correctamente' }; // Mensaje de éxito
    } catch (err) {
        throw new Error('Error al agregar el producto: ' + err.message); // Manejo de errores
    }
};

// Actualizar un producto existente
const updateProduct = async (id, name, description, price, status, image) => {
    try {
        // Actualizamos los datos de un producto por su ID
        await sql.query`
      UPDATE Products
      SET name = ${name}, description = ${description}, price = ${price}, status = ${status}, image = ${image}
      WHERE id = ${id}
    `;
        return { message: 'Producto actualizado correctamente' }; // Mensaje de éxito
    } catch (err) {
        throw new Error('Error al actualizar el producto: ' + err.message); // Manejo de errores
    }
};

// Eliminar un producto por su ID
const deleteProduct = async (id) => {
    try {
        // Eliminamos un producto por su ID
        await sql.query`DELETE FROM Products WHERE id = ${id}`;
        return { message: 'Producto eliminado correctamente' }; // Mensaje de éxito
    } catch (err) {
        throw new Error('Error al eliminar el producto: ' + err.message); // Manejo de errores
    }
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
