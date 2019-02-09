var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res, next) {
      models.messages.get(function (err, results) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).json(results);
        }
        next();
      });
    },

    // a function which handles posting a message to the database
    post: function (req, res, next) {
      models.messages.post(req.body, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json(results);
        }
        next();
      });
    }
  },

  // Ditto as above
  users: {
    get: function (req, res, next) {
      models.users.get(function (err, results) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).json(results);
        }
        next();
      });
    },

    post: function (req, res, next) {
      models.users.post(req.body, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json(results);
        }
        next();
      });
    }
  }
};

