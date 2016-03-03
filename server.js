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
var posts = [
  {
    title:"post1",
    content:"1,2,3,4,5",
    date:"2016-02-25"
  },
  {
    title:"post2",
    content:"1,2,3,4,5",
    date:"2016-02-25"
  },
  {
    title:"post3",
    content:"1,2,3,4,5",
    date:"2016-02-25"
  }
]
app.get("/posts", function (req, res) {
  connection.query('SELECT * from posts', function(err, rows, fields) {
    if (err) throw err;
    console.log('Output', rows);
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
  posts[id].title=req.body.title
  posts[id].content=req.body.content
  posts[id].date=req.body.date
  res.send("ok")
})
app.delete("/post/:id", function (req, res) {
  var id = req.params.id;
  id=Number(id);
  var newList = [];
  for(var i=0; i<posts.length; i++)  {
    if (!(i === id)) {
      newList.push(posts[i])
    }
  }
  posts=newList;
  res.send("ok");
})
var path = require('path');
app.route('/p/*').get(function(req, res) {
res.sendFile(path.resolve('./public/post.html'));
});
app.listen(3000, function () {
  console.log("megyAserver")
})
