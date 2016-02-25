"use strict"
var user= {username: "flori", password: "flori"}
var username = document.querySelector(".username")
var password = document.querySelector(".password")
var loginButton = document.querySelector(".loginButton")
var loginMenu = document.getElementById("login")
var menu = document.getElementById("menu")

loginButton.addEventListener("click", function () {

  if (username.value===user.username && password.value===user.password) {
      loginMenu.style.display="none"
      menu.style.display="block"
  }
})
console.log(5)
