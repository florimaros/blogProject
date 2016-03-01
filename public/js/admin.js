"use strict"
var title=document.querySelector(".title")
//a title osztalyu elemet eltaroljuk a title valtozoban, ezzel erjuk el a html dolgokat
var date=document.querySelector(".date")
var content=document.querySelector(".content")
var postButton=document.querySelector(".post")
var posts=document.querySelector("#postList")
var addPostLink=document.querySelector(".addPostLink")
var deletePost=document.querySelector(".deletePost")
var addPost=document.querySelector(".addPost")
var postsDiv=document.querySelector(".posts")
addPostLink.addEventListener("click", function () {
  addPost.style.display="block"
  postsDiv.style.display="none"
})
deletePost.addEventListener("click", function () {
  addPost.style.display="none"
  postsDiv.style.display="block"
})
postButton.addEventListener("click", function () {
  //a post gombra tettunk egy esemenyfigyelot
  var postItem={title: title.value, date: date.value, content: content.value}
  var request=new XMLHttpRequest()
  //post kerest kuldunk az url-re beallitjuk a headerjet, kuldjuk el neki a stringe alakitott post itemet
  request.open("POST", "http://localhost:3000/post")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(postItem))
})
function getPosts() {
  var request=new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/posts")
  //posts egy endpoint a szerveren ra egy get kerest var, ha megkapja akkor
  //visszakuldi a kloiensnek az altala tarolt postokat
  request.onreadystatechange=function () {
    if (request.readyState===4) {
      parseResponse(JSON.parse(request.response));
    }
  }
  request.send();
}
function createListItem(tiTle, id) {
  var listItem=document.createElement("li");
  var button=document.createElement("button");
  var editButton=document.createElement("button")
  listItem.innerText=tiTle;
  button.innerText="delete";
  editButton.innerText="edit";
  posts.appendChild(listItem);
  listItem.appendChild(button);
  listItem.appendChild(editButton);

  button.addEventListener("click", function () {
    //alert(id)
    listItem.remove();
    var request=new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/post/"+id)
    request.send();
  editButton.addEventListener("click", function () {

  })


  })
}
function parseResponse(response) {
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].title)
  createListItem(response[i].title, i);
  }
}
getPosts();
