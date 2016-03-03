"use strict"
var express = require("express");
//beletöltöd az expressbe, a kifejezest az express alat hasznalod
//express arra valo h html servert hozz letre
var bodyParser = require("body-parser")
//http-n keresztul csak stringet lehet kuldeni, mi pedig json formatumu stringet kuldunk,
//amit amikor megkap a server stringkent ertelmez,
//figyeli h a tartalomban json van-e es atalakitja json-e a stringet h objektumkent tudja hasznalni
var app = express();
//expressben eltaroltuk a modult neki van egy konstruktora ami felepiti a servert ez kerul az appba
//konstruktor folepit egy objektumot inicializal dolgokat ennek lesz
app.use(express.static("public"));
//use-val allitod be milyen middlewarekat hasznaljon, a statikus fileokat a public mappabol szolgalja ki
app.use(bodyParser.json())
//a kliens es a szerver kozott ezeket hasznalja a keresekben, a http keresnek
//a bodijat nezi es ha a content tipe header erteke application json akkor a bodijat atalakitja json-e
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
  //a get f endpointot csinal, ket parametere van:
  //az endpoint rutja, ha erre a rutra erkezik egy get keres ez a function hajtodik vegre
res.send(JSON.stringify(posts))
//res.json(posts) amikor erkezik egy get keres a post rutra o valaszol, atalakitja string-e a post listat
})
app.post("/post", function (req, res) {
//post kerest var a post ruton,
  posts.push(req.body)
//mielott bepusolodna atalakul objektumma
  res.send("ok")
//amikor odamegy a keres berakja a tartalmat egy megfelelo helyre es valaszol h oke
})
app.post("/edit/:id", function (req, res) {
  var id=req.params.id;
  id=Number(id);
  posts[id].title=req.body.title
  posts[id].content=req.body.content
  posts[id].date=req.body.date
  //elkuldjuk a bodijaban az uj adatokat a /id-s dologra,
  //majd kivalasztja a listabol az id indexu elemet es atszerkeszti annak a kontentjet
  res.send("ok")
})
app.delete("/post/:id", function (req, res) {
  //a server a /post/id endpoitra var egy delete kerest
  var id = req.params.id;
  id=Number(id);
  //parameterek valtoznak, bekerul a req params objektumaba az id es tudod hasznalni az erteket
  //console.log(id)
  var newList = [];
  for(var i=0; i<posts.length; i++)  {
    //console.log(i)
    if (!(i === id)) {
      newList.push(posts[i])
    }
  }
  //console.log(newList)
  posts=newList;
  res.send("ok");
  //valaszol, kliens kuld egy kerest h szeretne vmit a szervertol,
  //a server valaszol, a kliens elkuldi a servernek a tenyleges kereset, majd a server valaszol
})

var path = require('path');
app.route('/p/*').get(function(req, res) {
res.sendFile(path.resolve('./public/post.html'));
});
//a /p/*akarmire erkezik egy get keres akkor egy file-t kuld vissza a
// kliensnek a serverrol ami a public post/html es elotte feloldja az eleresi utvonalat
app.listen(3000, function () {
  //ezeket a kereseket a porton figyeli, induljon el a serverunk
  console.log("megyAserver")
})
//plugin mysql npm install mysql require mysql
