"use strict"
var title=document.querySelector("a")
var date=document.querySelector("h3")
var content=document.querySelector("p")
var id=window.location.pathname
var link=document.createElement("a")
link.innerText="backToTheFuture"
link.setAttribute("href", "http://" + location.host )
id=id.split("/")
id=id[2]
id=Number(id)
var request = new XMLHttpRequest();
request.open("GET", "http://" + location.host+ "/posts")
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
    title.setAttribute("href","http://" + location.host + "")
  }
}
document.body.appendChild(link)
request.send();
