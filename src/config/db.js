const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1', // Usamos 127.0.0.1 estricto para forzar IPv4 y evitar conflictos de localhost
    port: 3306,
    user: 'root',
    password: '',
    database: 'kairon_intranet'
});

// Test rápido de conexión al arrancar
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión a MySQL establecida correctamente.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error fatal al conectar con MySQL:', err.message);
    });

module.exports = pool;