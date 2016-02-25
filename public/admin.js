"use strict";
var header = document.querySelector(".header");
var post = document.querySelector(".post");
var content = document.querySelector(".content");

post.addEventListener("click", function () {
  var blogPost = {header: "", content: ""}
blogPost.header=header.value;
blogPost.content=content.value;
console.log(blogPost);
})
