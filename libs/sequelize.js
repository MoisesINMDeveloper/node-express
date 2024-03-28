const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Función personalizada para el registro
const customLogger = (log) => {
  // Personaliza cómo deseas registrar el mensaje de log
  console.log(log);
};

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: customLogger, // Proporciona la función de registro personalizada
});

module.exports = sequelize;
