require('dotenv').config();

const DIALECT = process.env.DB_DIALECT;
const SCHEME = process.env.SCHEME;

const validSchemes = {
  mysql: ['mysql'],
  postgres: ['postgres', 'postgresql'],
};

if (!validSchemes[DIALECT]?.includes(SCHEME)) {
  throw new Error(
    `SCHEME inválido (${SCHEME}) para DB_DIALECT=${DIALECT}`
  );
}

const engines = {
  mysql: {
    scheme: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB,
    dialect: 'mysql',
  },

  postgres: {
    scheme: 'postgres',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
  }
};

const active = engines[DIALECT];

const config = {
  env: process.env.NODE_ENV || 'dev',
  ...active,
};

module.exports = { config };
