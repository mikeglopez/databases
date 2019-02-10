CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name TEXT NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  message_text TEXT,
  user_name TEXT,
  room_name TEXT
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- INSERT INTO messages (user_id, room_id, message_text, created_at) VALUES (
--   (SELECT id FROM users WHERE user_name = 'mike'),
--   (SELECT id FROM rooms WHERE room_name = 'kitchen'),
--   'Help!',
--   '911');

--  INSERT INTO messages (user_id, message_text, created_at) VALUES (
--   (SELECT id FROM users WHERE user_name = 'Jamal'),
--   'A whole different Help!',
--   '911911');

  -- CREATE TABLE rooms (
--   id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   room_name TEXT NOT NULL
-- );
