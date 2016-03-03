"use strict"
var title=document.querySelector(".title")
var date=document.querySelector(".date")
var content=document.querySelector(".content")
var postButton=document.querySelector(".post")
var posts=document.querySelector("#postList")
var addPostLink=document.querySelector(".addPostLink")
var deletePost=document.querySelector(".deletePost")
var addPost=document.querySelector(".addPost")
var postsDiv=document.querySelector(".posts")
var editPost=document.querySelector(".editPost")
var editPostLink=document.querySelector(".editPostLink")
var editId
addPostLink.addEventListener("click", function () {
  addPost.style.display="block"
  postsDiv.style.display="none"
  editPost.style.display="none"
})
deletePost.addEventListener("click", function () {
  addPost.style.display="none"
  postsDiv.style.display="block"
  editPost.style.display="none"
  var editButtons=document.querySelectorAll(".postEditButton")
  for(var i=0; i<editButtons.length; i++) {
    editButtons[i].style.display="none"
  }
  var deletePostButtons=document.querySelectorAll(".deletePostButton")
  for(var i=0; i<deletePostButtons.length; i++)  {
    deletePostButtons[i].style.display="inline"
  }
})
editPostLink.addEventListener("click", function () {
  addPost.style.display="none"
  postsDiv.style.display="block"
  var editButtons=document.querySelectorAll(".postEditButton")
  for(var i=0; i<editButtons.length; i++) {
    editButtons[i].style.display="inline"
  }
  var deletePostButtons=document.querySelectorAll(".deletePostButton")
  for(var i=0; i<deletePostButtons.length; i++)  {
    deletePostButtons[i].style.display="none"
  }
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
  button.classList.add("deletePostButton")
  var editButton=document.createElement("button")
  editButton.classList.add("postEditButton")
  editButton.addEventListener("click", function () {
    editId=id
    var request=new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/posts")
    request.onreadystatechange=function () {
      if (request.readyState===4) {
        var response=JSON.parse(request.response)[id];
        document.querySelector(".editTitle").value=response.title
        document.querySelector(".editContent").value=response.content
        document.querySelector(".editDate").value=response.date
      }
    }
    request.send();
    editPost.style.display="block"
  })
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
  })
}
function parseResponse(response) {
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].title)
  createListItem(response[i].title, response[i].id);
  }
}
getPosts();
var editPost=document.querySelector(".editPost")
editPost.addEventListener("click", function () {
  var request=new XMLHttpRequest();
  var postItem={title: document.querySelector(".editTitle").value,
  date: document.querySelector(".editDate").value,
  content: document.querySelector(".editContent").value
}
  request.open("POST", "http://localhost:3000/edit/" + editId)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(postItem))

})
