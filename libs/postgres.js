require('dotenv').config();

const { Client } = require('pg');

async function getConnection() {

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  try {

    await client.connect();

    console.log('Connected to PostgreSQL successfully.');

    return client;

  } catch (err) {

    console.error('Database connection error:', err.stack);

    throw err;
  }
}

module.exports = { getConnection };
