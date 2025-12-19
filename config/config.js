require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  dbPort: process.env.DB_PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  scheme: process.env.DB_SCHEME,      // mysql | postgresql
  dialect: process.env.DB_DIALECT,  // mysql | postgres
};

module.exports = { config };





