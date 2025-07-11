// models/contactModel.js

const { sql } = require('../config/db');

// Obtener todos los mensajes de contacto
const getAllMessages = async () => {
    try {
        const result = await sql.query('SELECT * FROM Contact');
        return result.recordset;
    } catch (err) {
        throw new Error('Error al obtener los mensajes de contacto');
    }
};

// Crear un nuevo mensaje de contacto
const createMessage = async (userId, message) => {
    try {
        await sql.query`
      INSERT INTO Contact (user_id, message)
      VALUES (${userId}, ${message})`;
    } catch (err) {
        throw new Error('Error al crear el mensaje de contacto');
    }
};

// Marcar un mensaje como resuelto
const resolveMessage = async (messageId) => {
    try {
        await sql.query`
      UPDATE Contact
      SET status = 'R', date_resolved = GETDATE()
      WHERE id = ${messageId}`;
    } catch (err) {
        throw new Error('Error al resolver el mensaje');
    }
};

module.exports = { getAllMessages, createMessage, resolveMessage };
