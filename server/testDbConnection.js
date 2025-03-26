// testDbConnection.js
const pool = require('./db');  // Adjust the path to your db.js file

async function testConnection() {
    try {
        const [rows, fields] = await pool.execute('SELECT 1 + 1 AS solution');
        console.log('The solution is:', rows[0].solution);  // Should print 2
    } catch (err) {
        console.error('Error:', err);
    }
}

testConnection();
