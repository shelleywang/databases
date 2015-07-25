var db = require('../db');


module.exports = {
  messages: {
    get: function (callback) { // a function which handles a get request for all messages
      db.runQuery("SELECT m.text, m.roomname, m.createdAt, m.updatedAt, u.username FROM messages m, users u WHERE m.userID = u.userID;", [], function(rows){
        if (callback) callback(rows);
      });
    }, 
    post: function (data, callback) { // a function which handles posting a message to the database
      checkUser(data.username, function(userID) {
        db.runQuery("INSERT INTO messages (userID, text, roomname) values (?,?,?)", 
          [userID,data.text,data.roomname], function(){
            if (callback) callback();
          });
      });
    } 
  }, 

  users: {
    // Ditto as above
    get: function (callback) {
      db.runQuery("SELECT * FROM users;", [], function(rows){
        if (callback) callback(rows);
      });
    },
    post: function (data, callback) {
      checkUser(data.username);
      if (callback) callback();
    }
  }
};


var checkUser = function(username, callback) {
  db.runQuery("SELECT userID FROM users WHERE username = ?;",[username], function(rows) {
    if (rows.length > 0){
      if (callback){
        callback(rows[0].userID);
      }
    } else {
      db.runQuery('INSERT INTO users (username) values (?)',[username], function(rows){
        if (callback){
          callback(rows.insertId);
        }
      });
    }
  });
};


