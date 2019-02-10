var mysql = require('mysql');
var pwd = require('../spec/login.js');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbConnection = mysql.createConnection({
  user: 'root',
  password: pwd.PASSWORD,
  database: 'chat'
});

dbConnection.connect();

module.exports = dbConnection;
