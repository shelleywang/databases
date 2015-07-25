var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      models.messages.get(function(rows){
        res.status(200).send({results:rows});
      });
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      models.messages.post(req.body, function(){
        res.status(201).send();
      });
    } 
  }, 

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(rows){
        res.status(200).send({results:rows});
      });
    },
    post: function (req, res) {
      models.users.post(req.body, function() {
        res.status(201).send();
      });
    }
  }
};

