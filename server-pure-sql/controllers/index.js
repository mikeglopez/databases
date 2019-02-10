var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function (err, results) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).json(results);
        }
      });
    },

    // a function which handles posting a message to the database
    post: function (req, res) {
      models.messages.post(req.body, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json(results);
        }
      });
    }
  },

  // Ditto as above
  users: {
    get: function (req, res) {
      models.users.get(function (err, results) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).json(results);
        }
      });
    },

    post: function (req, res) {
      models.users.post(req.body, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json(results);
        }
      });
    }
  }
};

