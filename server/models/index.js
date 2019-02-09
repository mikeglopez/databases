var dbConnection = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var queryString = 'SELECT * FROM messages';
      // SELECT messages.message_text, messages.created_at, messages.id, users.user_name, rooms.room_name FROM messages

      dbConnection.query(queryString, callback);
    }, // a function which produces all the messages

    post: function (message, callback) {
      // console.log('*****************message', message);
      // console.log('**********message.message', message.message);
      // console.log('***************created_at', created_at);
      // message = {
      //   created_at: '1234',
      //   message_text: message.message
      // };
      console.log('*****************message', message);
      console.log('*****************message', typeof message);

      dbConnection.query('INSERT INTO messages SET ?', message, callback);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryString = 'SELECT * FROM users';

      dbConnection.query(queryString, callback);
    },

    post: function (user, callback) {
      dbConnection.query('INSERT INTO users SET ?', user, callback);
    }
  }
};

