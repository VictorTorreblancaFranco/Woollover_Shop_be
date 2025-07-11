// app.js

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');
const cartRoutes = require('./routers/cartRoutes'); // Asegúrate de que esta línea está incluida
const contactRoutes = require('./routers/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Permitir que Express procese datos JSON

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes); // Asegúrate de que esta línea está incluida
app.use('/api/contact', contactRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
