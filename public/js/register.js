"use strict"
var registerButton=document.querySelector(".registerButton")
var username=document.querySelector(".username")
var password=document.querySelector(".password")

registerButton.addEventListener("click", function () {
  var request=new XMLHttpRequest()
  var postItem={username: username.value , password: password.value, is_admin: false}
  request.open("POST", "http://" + location.host + "/users")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(postItem))
  request.onreadystatechange=function () {
    if (request.readyState===4) {
      if (request.status===200) {
        localStorage.setItem("username", username.value)
        window.location = 'http://localhost:3000/admin2.html'
      }
      else if (request.status===404) {
        alert("unsucsesfull registration")
      }
    }
  }
})
