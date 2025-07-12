// app.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { connectDB } = require('./config/db');
const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');
const cartRoutes = require('./routers/cartRoutes');
const contactRoutes = require('./routers/contactRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Servir imágenes estáticas desde la carpeta 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
