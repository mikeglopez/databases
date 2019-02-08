var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var queryString = 'SELECT * FROM messages';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function (err, results) {
        if (err) {
          console.log('error==================>', err);
          // res.sendStatus(404);
        } else {
          console.log('SUCCESS withing GET MESSAGE');
          // res.status(200).json({});
        }
      }
      );
    }, // a function which produces all the messages
    post: function (message) {
      var query = dbConnection.query('INSERT INTO messages (message_text) VALUES ?', message, function (error, results, fields) {
        if (error) {
          throw error;
        } else {
          console.log('SUCCESS within POST MESSAGE');
          // Neat!
          // res.status(201).json({objectId, createdAt}});
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function (err, results) {
        if (err) {
          console.log('error==================>', err);
          // res.sendStatus(404);
        } else {
          console.log('SUCCESS within GET USER');
          // res.status(200).json({});
        }
      }
      );
    },
    post: function (user) {
      var query = dbConnection.query('INSERT INTO users (user_name) VALUES ?', user, function (error, results, fields) {
        if (error) {
          throw error;
        } else {
          console.log('SUCCESS within POST USER');
          // Neat!
          // res.status(201).json({objectId, createdAt}});
        }
      });
    }
  }
};

