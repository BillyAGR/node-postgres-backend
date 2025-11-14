const { Client} = require('pg');

async function getConnection() {
    const client = new Client({
        user: 'BillPostgres',
        host: 'localhost',
        database: 'my_store',
        password: 'adminRoot123',
        port: 5432,
    });

    try {
        await client.connect();
        console.log('Connected to the database successfully.');
        return client;
    } catch (err) {
        console.error('Database connection error:', err.stack);
        throw err;
    }
}

module.exports = { getConnection };