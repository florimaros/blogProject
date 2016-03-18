"use strict"
function getPosts() {
  var request = new XMLHttpRequest();
  request.open("GET", location.href + "posts")
  request.onreadystatechange=function () {
    if (request.readyState===4) {
      parseResponse(JSON.parse(request.response))
    }
  }
  request.send()
}
function parseResponse(response) {
  for(var i=0; i<response.length; i++) {
    createPost(response[i].title, response[i].date, response[i].content, response[i].id)
  }
}
function createPost(tiTle, daTe, conTent, id) {
  var post = document.createElement("div")
  post.classList.add("post")
  var title = document.createElement("h1")
  var url=document.createElement("a")
  var date = document.createElement("h3")
  var content = document.createElement("p")
  url.innerText= tiTle
  title.appendChild(url)
  url.setAttribute("href", "/p/"+id)
  date.innerText= daTe
  content.innerText=conTent
  post.appendChild(title)
  post.appendChild(date)
  post.appendChild(content)
  document.querySelector(".wrapper").appendChild(post)
}
getPosts()

var loginButton=document.querySelector(".loginButton")
var goToAdminButton=document.querySelector(".goToAdminButton")
var registerButton=document.querySelector(".registerButton")

function displayLoginControls() {
  if (localStorage.getItem("username")!==null) {
    loginButton.style.display="none"
    goToAdminButton.style.display="inline"
    registerButton.style.display="none"
  }
  else {
    loginButton.style.display="inline"
    goToAdminButton.style.display="none"
    registerButton.style.display="inline"
  }
}

loginButton.addEventListener("click", function () {
  window.location = 'http://localhost:3000/login.html'
})

goToAdminButton.addEventListener("click", function () {
  window.location = 'http://localhost:3000/admin2.html'
})

registerButton.addEventListener("click", function () {
  window.location= "http://localhost:3000/register.html"
})
displayLoginControls()
