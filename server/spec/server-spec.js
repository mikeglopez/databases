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
      json: { username: 'Valjean' }
    }, function () {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function (err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].username).to.equal('Valjean');
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
        username: 'Valjean',
        text: 'In mercy\'s name, three days is all I need.',
        roomname: 'Hello'
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
        expect(results[0].username).to.equal('Valjean');
        expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');
        expect(results[0].roomname).to.equal('Hello');
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
        username: 'Valjean',
        text: 'Men like you can never change!',
        roomname: 'main'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        // Now query the Node chat server and see if it returns
        // the message we just inserted:
        request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog[0].username).to.equal('Valjean');
          expect(messageLog[0].text).to.equal('Men like you can never change!');
          expect(messageLog[0].roomname).to.equal('main');
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
        username: 'Valjean'
      }
    }, request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: {
        username: 'Rupa'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        request('http://127.0.0.1:3000/classes/users', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog.length).to.equal(2);
          expect(messageLog[0].username).to.equal('Valjean');
          expect(messageLog[1].username).to.equal('Rupa');
          done();
        });
      });
    }));
  });

  it('Should contain all required columns in the messages table', function (done) {
    var queryString = 'SELECT * FROM messages';
    var queryArgs = [];

    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Rupa',
        text: 'Hi',
        roomname: 'main'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog[0]).to.have.property('username');
          expect(messageLog[0]).to.have.property('text');
          expect(messageLog[0]).to.have.property('roomname');
          expect(messageLog[0]).to.have.property('createdAt');
          expect(messageLog[0]).to.have.property('updatedAt');
          done();
        });
      });
    });
  });

  it('Should contain all required columns in the users table', function (done) {
    var queryString = 'SELECT * FROM users';
    var queryArgs = [];

    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: {
        username: 'Rupa'
      }
    }, function () {
      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }

        request('http://127.0.0.1:3000/classes/users', function (error, response, body) {
          var messageLog = JSON.parse(body);
          expect(messageLog[0]).to.have.property('username');
          expect(messageLog[0]).to.have.property('createdAt');
          expect(messageLog[0]).to.have.property('updatedAt');
          done();
        });
      });
    });
  });
});
