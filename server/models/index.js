var { Message, User } = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      Message.findAll()
        .then(function (results) {
          callback(null, results);
        }).catch(function (err) {
          callback(err, null);
        });
    },

    post: function (message, callback) {
      Message.create(message)
        .then(function (results) {
          callback(null, results);
        })
        .catch(function (err) {
          callback(err, null);
        });
    }
  },

  users: {
    get: function (callback) {
      User.findAll()
        .then(function (results) {
          callback(null, results);
        }).catch(function (err) {
          callback(err, null);
        });
    },

    post: function (user, callback) {
      User.create(user)
        .then(function (results) {
          callback(null, results);
        })
        .catch(function (err) {
          callback(err, null);
        });
    }
  }
};

