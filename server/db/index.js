var Sequelize = require('sequelize');
var pwd = require('../spec/login.js');

var dbConnection = new Sequelize('chat', 'root', pwd.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 2,
    idle: 10000
  }
});

dbConnection.sync();

module.exports = dbConnection;
