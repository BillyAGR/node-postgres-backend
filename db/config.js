const { config } = require('./../config/config');

const USER = encodeURIComponent(config.user);
const PASSWORD = encodeURIComponent(config.password);

const URI = `${config.scheme}://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`;
console.log(URI);

module.exports = {
  development: {
    url: URI,
    dialect: config.dialect,
  },
  production: {
    url: URI,
    dialect: config.dialect,
  },
}
