// config/db.js

const sql = require('mssql');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Configuración de conexión a SQL Server
const dbConfig = {
    user: process.env.DB_USER, // 'sa'
    password: process.env.DB_PASSWORD, // 'Admin12345'
    server: process.env.DB_SERVER, // 'localhost' o '127.0.0.1'
    database: process.env.DB_DATABASE, // 'WoolLoverDB'
    options: {
        encrypt: true, // Utiliza encriptación para conexiones seguras
        trustServerCertificate: true, // Acepta certificados no verificados (útil para desarrollo)
    },
};

// Función para conectar a la base de datos
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log("Conexión a la base de datos establecida.");
    } catch (err) {
        console.error("Error de conexión a la base de datos: ", err);
    }
}

module.exports = { sql, connectDB };
