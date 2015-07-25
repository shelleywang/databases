var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.runQuery = function(query, values, callback){
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