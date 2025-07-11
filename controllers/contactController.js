// controllers/contactController.js

const { sql } = require('../config/db');

// Obtener todos los mensajes de contacto
const getAllMessages = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Contact');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los mensajes', error: err });
    }
};

// Crear un nuevo mensaje de contacto
const createMessage = async (req, res) => {
    const { userId, message } = req.body;
    try {
        await sql.query`
      INSERT INTO Contact (user_id, message)
      VALUES (${userId}, ${message})`;
        res.json({ message: 'Mensaje enviado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al enviar mensaje', error: err });
    }
};

// Marcar un mensaje como resuelto
const resolveMessage = async (req, res) => {
    const messageId = req.params.messageId;
    try {
        await sql.query`
      UPDATE Contact
      SET status = 'R', date_resolved = GETDATE()
      WHERE id = ${messageId}`;
        res.json({ message: 'Mensaje resuelto correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al resolver el mensaje', error: err });
    }
};

module.exports = { getAllMessages, createMessage, resolveMessage };
