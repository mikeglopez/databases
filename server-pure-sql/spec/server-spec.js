/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;
var pwd = require('./login.js');

describe('Persistent Node Chat Server', function () {
  var dbConnection;

  beforeEach(function (done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: pwd.PASSWORD,
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function () {
    dbConnection.end();
  });

  it('Should insert posted users to the DB', function (done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { user_name: 'Valjean' }
    }, function () {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function (err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].user_name).to.equal('Valjean');
        done();
      });
    });
  });

  it('Should insert posted messages to the DB', function (done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        user_name: 'Valjean',
        message_text: 'In mercy\'s name, three days is all I need.',
        room_name: 'Hello'
      }
    }, function () {
      // Now if we look in the database, we should find the
      // posted message there.

      // TODO: You might have to change this test to get all the data from
      // your message table, since this is schema-dependent.
      var queryString = 'SELECT * FROM messages';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function (err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].user_name).to.equal('Valjean');
        expect(results[0].message_text).to.equal('In mercy\'s name, three days is all I need.');
        expect(results[0].room_name).to.equal('Hello');
        done();
      });
    });
  });

  it('Should output all messages from the DB', function (done) {
    // Let's insert a message into the db
    var queryString = 'SELECT * FROM messages';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        user_name: 'Valjean',
        message_text: 'Men like you can never change!',
        room_name: 'main'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        // Now query the Node chat server and see if it returns
        // the message we just inserted:
        request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog[0].user_name).to.equal('Valjean');
          expect(messageLog[0].message_text).to.equal('Men like you can never change!');
          expect(messageLog[0].room_name).to.equal('main');
          done();
        });
      });
    });
  });

  it('Should output all users from the DB', function (done) {
    var queryString = 'SELECT * FROM users';
    var queryArgs = [];

    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: {
        user_name: 'Valjean'
      }
    }, request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: {
        user_name: 'Rupa'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        request('http://127.0.0.1:3000/classes/users', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog.length).to.equal(2);
          expect(messageLog[0].user_name).to.equal('Valjean');
          expect(messageLog[1].user_name).to.equal('Rupa');
          done();
        });
      });
    }));
  });
});
