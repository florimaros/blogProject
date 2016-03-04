"use strict"
var mysql = require('mysql');
//importalja  a mysql modult
var connection = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: '05011978',
  database: 'blog',
  timezone: 'utc'
});
//a connectionba meghivja a mysql createconn fuggvenyet, ezzel  letrehoz egy kapcsolatot
//  az adatbazissal- megadtuk mik lesznek az infok
connection.connect();
//csatlakozik az adatbazishoz
var express = require("express");
//importalja az express modult, amely letrehoz egy http servert
var bodyParser = require("body-parser")
//a http keresnek a headerje application/json tipusu akkor a body parseratalakitja a http keres bod reszet js objektumma
var app = express();
//meghivja az expressnek a konstruktorat, ez a fuggvenyhivas letrehozza a servert
app.use(express.static("public"));
//milyen middlewareket hasznaljon, az osszes statikus filet a public mappabol kuldje
app.use(bodyParser.json())
//hasznalja ha application json tipusa van akkor atalakitja a stringet json-e
app.get("/posts", function (req, res) {
//var egy get kerest a get a perposts endpointra, ha jon keres erre a postra,
//akkor a masodik parameterben megadott f fut le
  connection.query('SELECT * from posts', function(err, rows, fields) {
//egy kerest kuld az adatbazisnak : valassza ki az osszes mezot  post tablabol
//a posts tablabol kered az osszes oszlop osszes sorat
    if (err) throw err;
//ha lenne hiba akkor dobjon error exeptiont
    res.send(JSON.stringify(rows))
//visszakuldi a kliensnek a stringe alakitott valaszt az adatbazis  servertol
  });
})
app.post("/post", function (req, res) {
//var egy post kerest a post endpointra, ha megjon akkor lefuttatja a f-t
  connection.query('INSERT INTO posts SET ?', req.body, function(err, rows, fields) {
//kuld egy lekerdezest az adatbazisnak (a vmi a reqest.body-bol jon, ami atalakult json-e, )
    if (err) throw err;
//ha van hiba akkor dobjon egy kivetelt, az exception olyan mint egy error
    res.send("ok")
//valaszol a kliensnek
  });
})
app.post("/edit/:id", function (req, res) {
//var egy post kerest az edit endpointra
  var id=req.params.id;
//kiszedi a keres parametereibol az id-t, ezzel fogod meg az id-t
  id=Number(id);
//stringkent tarolodott az id, atvaltjuk szamma
  connection.query('UPDATE posts SET ? WHERE id=?', [req.body, id],  function(err, rows, fields) {
//kuld egy lekerdezest az adatbazisban, a post tablaban fog frissiteni
// ,a req.body-ban levo adatok be fognak kerulni a sorba ahol az id=z altalad megadott id-vel
    if (err) throw err;
    res.send("ok")
  });
});
app.delete("/post/:id", function (req, res) {
//var egy delete kerest a post endpointra, itt tudja meg a ser4ver mely id-t szeretned atvenni
  var id = req.params.id;
  id=Number(id);
  connection.query('DELETE FROM posts WHERE id=?', id,  function(err, rows, fields) {
//megmondja h ahol az adott id van toroljuk ki az adott sort
    if (err) throw err;
    res.send("ok")
  });
})
var path = require('path');
//importalja a path modult,
app.route('/p/*').get(function(req, res) {
//a http serverunkre /p jon egy keres  akkor lefut a f
res.sendFile(path.resolve('./public/post.html'));
//kuldjunk vissza egy filet, utvonal mit kell elkuldeni
});
app.listen(3000, function () {
  console.log("megyAserver")
})
