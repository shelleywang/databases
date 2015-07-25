var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      runQuery("SELECT * FROM messages;");
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      console.log(req.body);
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      runQuery("SELECT * FROM users;");
    },
    post: function (req, res) {
      console.log(req.body);
      checkUser(req.body.username, function(exists) {
        console.log('TESTING OUTSIDE EXISTS',req.body.username);
        if (!exists) {
          console.log('TESTING',req.body.username);
          runQuery('INSERT INTO users (username) values (?)',[req.body.username]);
        }
      });
    }
  }
};

var checkUser = function(username, callback) {
  runQuery("SELECT userID FROM users WHERE username = ?;",[username], function(rows) {
    rows !== [] ? callback(true, rows[0]) : callback(false);
  });
};

var runQuery = function(query, values, callback){
  var connection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
     
  connection.connect();

  connection.query({
    sql: query,
    timeout: 40000, // 40s 
    values: values
  }, function(err, rows, fields) {
    if (err) throw err;
   
    if (callback) {
      callback(rows);
    }
  });
   
  connection.end();
}

