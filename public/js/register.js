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
})
