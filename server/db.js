const mysql = require('mysql2/promise'); // Using promise-based version

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '85firanmit@ubuntu2023',
  database: process.env.DB_NAME || 'ethiopian_dating',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = pool;