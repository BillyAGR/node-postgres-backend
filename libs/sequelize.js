const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.user);
const PASSWORD = encodeURIComponent(config.password);

const URI =
  `${config.scheme}://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`;

const sequelize = new Sequelize(URI, {
  dialect: config.dialect,
  logging: false,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
