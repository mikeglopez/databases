var dbConnection = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      var queryString = 'SELECT * FROM messages';

      dbConnection.query(queryString, callback);
    },

    // a function which can be used to insert a message into the database
    post: function (message, callback) {
      dbConnection.query('INSERT INTO messages SET ?', message, function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });

      /*
       INSERT INTO messages (user_id, message_text, created_at) SET (
        (SELECT id FROM users WHERE user_name = 'Jamal'),
        'A whole different Help!',
        '911911');
      */
    }
  },

  // Ditto as above.
  users: {
    get: function (callback) {
      var queryString = 'SELECT * FROM users';

      dbConnection.query(queryString, callback);
    },

    post: function (user, callback) {
      dbConnection.query('INSERT INTO users SET ?', user, function(err, results) {
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

