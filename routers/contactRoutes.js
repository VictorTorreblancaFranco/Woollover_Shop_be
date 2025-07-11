// routers/contactRoutes.js

const express = require('express');
const router = express.Router();
const { getAllMessages, createMessage, resolveMessage } = require('../controllers/contactController');

// Obtener todos los mensajes de contacto
router.get('/', getAllMessages);

// Crear un nuevo mensaje de contacto
router.post('/', createMessage);

// Marcar un mensaje como resuelto
router.put('/:messageId', resolveMessage);

module.exports = router;
