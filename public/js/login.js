"use strict"
var loginButton=document.querySelector(".loginButton")
var username=document.querySelector(".username")
var password=document.querySelector(".password")

loginButton.addEventListener("click", function () {
  var request=new XMLHttpRequest()
  var postItem={username: username.value , password: password.value}
  request.open("POST", "http://" + location.host + "/login")
  request.setRequestHeader("Content-Type", "application/json")
  request.onreadystatechange=function () {
    if (request.readyState===4) {
      if (request.status===200) {
        localStorage.setItem("username", username.value)
        window.location = 'http://localhost:3000/admin2.html'
      }
      else if (request.status===404) {
        alert("wrong username/ password")
      }
    }
  }
  request.send(JSON.stringify(postItem))
})
