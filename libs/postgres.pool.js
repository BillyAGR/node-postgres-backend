const { Pool } = require('pg');

const { config } = require('./../config/config');


const options = {};


if (config.isProd) {
  URI = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}
class PostgresPool {
  // Static property that will store the single instance.
  static instance = null;

  constructor() {
    if (PostgresPool.instance) {
      // If it already exists, we return the same instance.
      return PostgresPool.instance;
    }

    // We create the native pg pool.
    this.pool = new Pool(options);

    // We listen for errors in the pool.
    this.pool.on('error', (err) => {
      console.error('Error inesperado en el pool', err);
    });

    console.log('✅ Nueva instancia de Pool creada');

    // We save the instance for future calls.
    PostgresPool.instance = this;
  }

  // Convenience method for queries
  async query(sql, params) {
    const result = await this.pool.query(sql, params);
    return result;
  }

  // Optional method to close the pool if the app shuts down
  async close() {
    await this.pool.end();
    console.log('🔒 Pool cerrado correctamente');
  }
}

module.exports = new PostgresPool(); // We export the single instance.
