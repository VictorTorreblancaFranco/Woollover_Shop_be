// controllers/userController.js

const { sql } = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
};

module.exports = { getAllUsers };
