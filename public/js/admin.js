"use strict"
var title=document.querySelector(".title")
//a title osztalyu elemet eltaroljuk a title valtozoban, ezzel erjuk el a html dolgokat
var date=document.querySelector(".date")
var content=document.querySelector(".content")
var post=document.querySelector(".post")
post.addEventListener("click", function () {
  //a post gombra tettunk egy esemenyfigyelot
  var postItem={title: title.value, date: date.value, content: content.value}
  var request=new XMLHttpRequest()
  //post kerest kuldunk az url-re beallitjuk a headerjet, kuldjuk el neki a stringe alakitott post itemet
  request.open("POST", "http://localhost:3000/post")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(postItem))
})
