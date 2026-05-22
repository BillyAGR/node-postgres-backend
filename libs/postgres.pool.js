const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {};

if (config.isProd) {
  options.connectionString = config.dbUrl;

  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  options.connectionString =
    `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

class PostgresPool {
  static instance = null;

  constructor() {
    if (PostgresPool.instance) {
      return PostgresPool.instance;
    }

    this.pool = new Pool({
      ...options,

      // Recommended settings
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    // Pool error listener
    this.pool.on('error', (err) => {
      console.error('❌ Unexpected error on PostgreSQL pool:', err);
    });

    // New connection listener
    this.pool.on('connect', () => {
      console.log('🟢 New PostgreSQL connection established');
    });

    // Connection removed listener
    this.pool.on('remove', () => {
      console.log('🟡 PostgreSQL connection removed');
    });

    console.log('✅ New PostgreSQL pool instance created');

    PostgresPool.instance = this;
  }

  // General query method
  async query(sql, params = []) {
    try {
      return await this.pool.query(sql, params);
    } catch (error) {
      console.error('❌ Error executing PostgreSQL query:', error);
      throw error;
    }
  }

  // Get client for transactions
  async getClient() {
    try {
      return await this.pool.connect();
    } catch (error) {
      console.error('❌ Error acquiring PostgreSQL client:', error);
      throw error;
    }
  }

  // Gracefully close the pool
  async close() {
    try {
      await this.pool.end();
      console.log('🔒 PostgreSQL pool closed successfully');
    } catch (error) {
      console.error('❌ Error closing PostgreSQL pool:', error);
      throw error;
    }
  }
}

module.exports = new PostgresPool();
