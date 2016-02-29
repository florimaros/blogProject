"use strict";
var header = document.querySelector(".header");
//kivalasztja az elso olyan domelemet amely rendelkezik a header classal
var post = document.querySelector(".post");
var content = document.querySelector(".content");

post.addEventListener("click", function () {
  //a kattintas esemenyfigyelot a domban talalhato post osztallyal rendelkezo elemre tesszuk
  var blogPost = {header: "", content: ""}

  blogPost.header=header.value;
  blogPost.content=content.value;
  console.log(blogPost);
})
