const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  // 127.0.0.1 en vez de localhost: evita que Node resuelva a IPv6 (::1) en Windows/XAMPP
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kairon_therapy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
  timezone: '-04:00',
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

// Prevent unhandled error events from crashing the process
pool.on('error', (err) => {
  console.error('[DB pool error]', err.code, err.message);
});

// Test rápido de conexión al arrancar
pool.getConnection()
  .then((connection) => {
    console.log('✅ Conexión a MySQL establecida correctamente.');
    connection.release();
  })
  .catch((err) => {
    console.error('❌ Error fatal al conectar con MySQL:', err.code, err.message);
  });

module.exports = pool;
