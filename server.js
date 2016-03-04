"use strict"
var mysql = require('mysql');
var connection = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: '05011978',
  database: 'blog',
  timezone: 'utc'
});
connection.connect();
var express = require("express");
var bodyParser = require("body-parser")
var app = express();
app.use(express.static("public"));
app.use(bodyParser.json())

app.get("/posts", function (req, res) {
  connection.query('SELECT * from posts', function(err, rows, fields) {
    if (err) throw err;
    // console.log('Output', rows);
    res.send(JSON.stringify(rows))
  });
})
app.post("/post", function (req, res) {
  connection.query('INSERT INTO posts SET ?', req.body, function(err, rows, fields) {
    if (err) throw err;
    res.send("ok")
  });
})
app.post("/edit/:id", function (req, res) {
  var id=req.params.id;
  id=Number(id);
  connection.query('UPDATE posts SET ? WHERE id=?', [req.body, id],  function(err, rows, fields) {
    if (err) throw err;
    res.send("ok")
  });
});
app.delete("/post/:id", function (req, res) {
  var id = req.params.id;
  id=Number(id);
  connection.query('DELETE FROM posts WHERE id=?', id,  function(err, rows, fields) {
    if (err) throw err;
    res.send("ok")
  });
})
var path = require('path');
app.route('/p/*').get(function(req, res) {
res.sendFile(path.resolve('./public/post.html'));
});
app.listen(3000, function () {
  console.log("megyAserver")
})
