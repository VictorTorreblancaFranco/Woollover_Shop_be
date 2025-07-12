// config/db.js

require('dotenv').config();
const sql = require('mssql');

// Configuración de conexión a SQL Server
const dbConfig = {
    user: process.env.DB_USER,           // e.g. 'sa'
    password: process.env.DB_PASSWORD,   // e.g. 'Admin12345'
    server: process.env.DB_SERVER,       // e.g. 'localhost'
    database: process.env.DB_DATABASE,   // e.g. 'WoolLoverDB'
    options: {
        encrypt: true,                     // para conexiones seguras
        trustServerCertificate: true       // acepta certificados no verificados en dev
    }
};

// Función para conectar a la base de datos
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log('✅ Conexión a la base de datos establecida.');
    } catch (err) {
        console.error('❌ Error de conexión a la base de datos:', err);
        process.exit(1); // sale del proceso si no hay conexión
    }
}

module.exports = { sql, connectDB };
