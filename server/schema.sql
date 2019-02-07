CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY,
  room_name TEXT NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  message_text TEXT,
  user_id INTEGER,
  room_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(room_id) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

