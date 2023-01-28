const Sequelize = require('sequelize');
const configDB = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(configDB);

User.init(connection)

connection.authenticate()
  .then(() => console.log('Conectado!!!'))
  .catch(() => console.log('Erro ao conectar!!!'))

module.exports = connection;