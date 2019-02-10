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

var User = dbConnection.define('users', {
  username: Sequelize.STRING
});

var Message = dbConnection.define('messages', {
  text: Sequelize.STRING,
  username: Sequelize.STRING,
  roomname: Sequelize.STRING
});

dbConnection.sync();

module.exports = {
  Message,
  User
};