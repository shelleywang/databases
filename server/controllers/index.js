var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      runQuery("SELECT * FROM messages;", [], function(rows){
        console.log("SELECT * FROM MESSAGES",JSON.stringify(rows));
        res.status(200).send(JSON.stringify(rows));
      });
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      console.log(req.body);
      checkUser(req.body.username, function(userID) {
        console.log(userID);
        runQuery("INSERT INTO messages (userID, text, roomname) values (?,?,?)", 
          [userID,req.body.text,req.body.roomname], function(){
            res.status(201).send();
          });
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      runQuery("SELECT * FROM users;", [], function(rows){
        res.status(200).send(JSON.stringify(rows));
      });
    },
    post: function (req, res) {
      checkUser(req.body.username);
      res.status(201).send();
    }
  }
};


var checkUser = function(username, callback) {
  runQuery("SELECT userID FROM users WHERE username = ?;",[username], function(rows) {
    if (rows.length > 0){
      if (callback){
        callback(rows[0].userID);
      }
    }else{
      runQuery('INSERT INTO users (username) values (?)',[username], function(rows){
        if (callback){
          callback(rows.insertId);
        }
      });
    }
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

