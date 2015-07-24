DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userID BIGINT(20) NOT NULL AUTO_INCREMENT,
  username VARCHAR(35),
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  messageID BIGINT(20) NOT NULL AUTO_INCREMENT,
  userID BIGINT(20) NOT NULL,
  text VARCHAR(140),
  roomname VARCHAR(35),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (messageID),
  FOREIGN KEY (userID) references users(userID)
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

