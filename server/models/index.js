var dbConnection = require('../db');
var Sequelize = require('sequelize');

var User = dbConnection.define('users', {
  user_name: Sequelize.STRING
});

var Message = dbConnection.define('messages', {
  message_text: Sequelize.STRING,
  user_name: Sequelize.STRING,
  room_name: Sequelize.STRING
});

module.exports = {
  messages: {
    // a function which produces all the messages
    // get: function (callback) {
    //   var queryString = 'SELECT * FROM messages';

    //   dbConnection.query(queryString, callback);
    // },

    get: function (callback) {
      console.log('************Help!');
      console.log('Message', Message);
      Message.findAll({ where: { user_name: 'Jamal' } })
        .then(function (results) {
          console.log('results:', results);
          callback(null, results);
        }).catch(function (err) {
          callback(err, null);
        });
    },

    post: function (message, callback) {
      Message.create(message);
    }

    // a function which can be used to insert a message into the database
    // post: function (message, callback) {
    //   dbConnection.query('INSERT INTO messages SET ?', message, function(err, results) {
    //     if (err) {
    //       callback(err, null);
    //     } else {
    //       callback(null, results);
    //     }
    //   });

    /*
     INSERT INTO messages (user_id, message_text, created_at) SET (
      (SELECT id FROM users WHERE user_name = 'Jamal'),
      'A whole different Help!',
      '911911');
    */

  },

  // Ditto as above.
  users: {
    get: function (callback) {
      var queryString = 'SELECT * FROM users';

      dbConnection.query(queryString, callback);
    },

    post: function (user, callback) {
      dbConnection.query('INSERT INTO users SET ?', user, function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });

      // after you finish inoke the post function of messages
    }
  }
};

