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
