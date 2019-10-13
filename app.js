var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var moment = require('moment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var con = mysql.createConnection({
    host: "localhost",
    user: "serviceuser",
    password: "lol",
    database: "examples"
});

// http://localhost:3000/insert?name=someText&text=irgendein&description=lol
app.get('/insert',  (req, res)  =>  {
    if(typeof req.query.name !== 'undefined' && typeof req.query.text !== 'undefined' && typeof req.query.description !== 'undefined') {
        var sql = "INSERT INTO someTable (uid, timestamp, name, text, description ) VALUES ?";
        var values = [
            [uuidv4(), moment().utc().format("YYYY-MM-DD"), req.query.name, req.query.text, req.query.description ]
        ]
        con.query(sql, [values] ,function (err, result) {
            if (err) return res.send(err);
            return res.send("insert successfully: " + result);
        });
    }
});

// http://localhost:3000/getByName/data
app.get('/getByName/:name',  (req, res)  =>  {
    // !!! Never build anything like this unless you want to risk SQL injection.
    // con.query("SELECT * FROM someTable WHERE name = '" + req.params.name + "'", function (err, result, fields) {
    // When query values are variables provided by the user, you should escape the values, like that "mysql.escape( )"
    var reqName = JSON.stringify(req.params.name);
    con.query("SELECT * FROM someTable WHERE name = " + mysql.escape(req.params.name), function (err, result, fields) {    
        if (err) return res.send(err);
        return res.json(result);
    });
});

// http://localhost:3000/getAll
app.get('/getAll',  (req, res)  =>  {
    con.query("SELECT * FROM someTable", function (err, result, fields) {
        if (err) return res.send(err);
        return res.json(result);
    });
});

// generates a uuid
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

module.exports = app;
