const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: config.dialect,
  },
  production: {
    url: config.dbUrl,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      }
    }
  }
}
