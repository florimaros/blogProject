"use strict"
var title=document.querySelector("a")
var date=document.querySelector("h3")
var content=document.querySelector("p")
var id=window.location.pathname
var link=document.createElement("a")
link.innerText="backToTheFuture"
link.setAttribute("href","http://localhost:3000/")
//visszaadja az url-ben levo eleresi utvonalat
id=id.split("/")
//kiertekelodik a jobboldal es atadodik a baloldalnak, foldaraboljuk perjelenkent
id=id[2]
id=Number(id)
//a harmadik elemre van szuksegunk
var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/posts")
request.onreadystatechange=function () {
  if (request.readyState===4) {
    var response=JSON.parse(request.response)
    for(var i=0; i<response.length; i++) {
      if (id===response[i].id) {
        var post=response[i]
      }
    }
    title.innerText=post.title
    date.innerText=post.date
    content.innerText=post.content
    title.setAttribute("href", "http://localhost:3000/")
  }
}
document.body.appendChild(link)
//a dokumentum bodijahoz hozzafuzi a linkben tarolt html objektumot
request.send();

//console.log(window.location.pathname.split("/")[2])
//stringkent visszaadja amit fent ír
//amikor betült a post html, post js-el kiolvassa az id-t .SPLIT-et kell
//hozzá használni ha megvan akkor a http kérésel kell legetelni a /post ot és kiválasztani azt az id-jut ami kell nekünk és megjeleneti
