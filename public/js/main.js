"use strict"
function getPosts() {
  var request = new XMLHttpRequest();
//letrehoztunk egy uj xmlhttp kerdest, new-al peldanyositjuk
//(minta mi alapjan kell megcsinalni, es abbol egy valos dolgot csinalsz)
  request.open("GET", "http://localhost:3000/posts")
  //megnyitja a kapcsot amin keresztul get kerest kuldunk majd(15sor) az url-re
  request.onreadystatechange=function () {
//meghivodik a mikor a readystate v megvaltozik, megvizsgalja mikor
//4-es a statusa, akkor hasznalhatjuk a request response-at
    if (request.readyState===4) {
      parseResponse(JSON.parse(request.response))
//meghivja a parseresponse f-t a jasonne alakitott valaszra
    }
  }
  request.send()
}
function parseResponse(response) {
  for(var i=0; i<response.length; i++) {
    createPost(response[i].title, response[i].date, response[i].content)
  }
}
function createPost(tiTle, daTe, conTent) {
  var post = document.createElement("div")
  post.classList.add("post")
  //a letrehozott div classs atributumahoz hozzaadtuk h post
  var title = document.createElement("h1")
  var date = document.createElement("h3")
  var content = document.createElement("p")
  title.innerText= tiTle
  //beallitjuk a title belso szoveget a tiTle ertekere- tartalmara
  date.innerText= daTe
  content.innerText=conTent
  post.appendChild(title)
  post.appendChild(date)
  post.appendChild(content)
  document.body.appendChild(post)
}
getPosts()
//meghivjuk a getpostot ami meghivja az osszes eddigi f-et
