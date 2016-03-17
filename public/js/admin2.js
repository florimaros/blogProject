"use strict"
var addPost= document.querySelector(".addPost")
addPost.addEventListener("click", function () {
  createAddPanel();
})


var postList=document.querySelector(".postList")
postList.addEventListener("click", function () {
  createListPostPanel();
})

function createAddPanel() {
  var main=document.querySelector(".main")
  main.innerText=""
  var title= document.createElement("input")
  title.setAttribute("type", "text")
  title.classList.add("title")
  var date= document.createElement("input")
  date.setAttribute("type", "date")
  date.classList.add("date")
  var content= document.createElement("textarea")
  content.classList.add("content")
  var button= document.createElement("button")
  button.innerText="send"
  button.addEventListener("click", function () {
    var title=document.querySelector(".title")
    var date=document.querySelector(".date")
    var content=document.querySelector(".content")
    var postItem={title: title.value, date: date.value, content: content.value}
    var request=new XMLHttpRequest()
    request.open("POST", "http://" + location.host + "/post")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(postItem))
  })
  main.appendChild(title)
  main.innerHTML+="<br>"
  main.appendChild(date)
  main.innerHTML+="<br>"
  main.appendChild(content)
  main.innerHTML+="<br>"
  main.appendChild(button)
}

function createListPostPanel() {
  var main=document.querySelector(".main")
  main.innerText=""
    var request=new XMLHttpRequest();
    request.open("GET", "http://" + location.host + "/posts")
    request.onreadystatechange=function () {
      if (request.readyState===4) {
        parseResponse(JSON.parse(request.response));
      }
    }
    request.send();
}

function parseResponse(response) {
  for (var i = 0; i < response.length; i++) {
  createListItem(response[i].title, response[i].id);
  }
}

function createListItem(tiTle, id) {
  var main=document.querySelector(".main")
  var listItem=document.createElement("li");
  var button=document.createElement("button");
  button.classList.add("deletePostButton")
  var editButton=document.createElement("button")
  editButton.classList.add("postEditButton")

  editButton.addEventListener("click", function () {
    var editId=id
    var request=new XMLHttpRequest();
    request.open("GET", "http://" + location.host + "/posts")
    request.onreadystatechange=function () {
      if (request.readyState===4) {
        var response=JSON.parse(request.response);
        for(var i=0; i<response.length; i++) {
          if(response[i].id === id) {
            response = response[i];
          }
        }
        var editTitle=document.createElement("input")
        editTitle.value=response.title

        var editContent=document.createElement("textarea")
        editContent.value=response.content;

        var editDate=document.createElement("input")
        editDate.setAttribute("type", "date")
        editDate.value=response.date

        var editPost=document.createElement("button")
        editPost.innerText="edit"
        editPost.addEventListener("click", function () {
          var request=new XMLHttpRequest();
          var postItem={title: editTitle.value,
          date: editDate.value,
          content: editContent.value
        }
          request.open("POST", "http://" + location.host + "/edit/" + editId)
          request.setRequestHeader("Content-Type", "application/json")
          request.send(JSON.stringify(postItem))
        })


        main.appendChild(editTitle)
        main.appendChild(editDate)
        main.appendChild(editContent)
        main.appendChild(editPost)


      }
    }
    request.send();
  })

  listItem.innerText=tiTle;
  button.innerText="delete";
  editButton.innerText="edit";
  main.appendChild(listItem);
  listItem.appendChild(button);
  listItem.appendChild(editButton);

  button.addEventListener("click", function () {
    listItem.remove();
    var request=new XMLHttpRequest();
    request.open("DELETE", "http://" + location.host + "/post/"+id)
    request.send();
  })
}
document.querySelector(".home").setAttribute("href", "http://" + location.host)

var usersList=document.querySelector(".usersList")
usersList.addEventListener("click", function () {
  var request=new XMLHttpRequest();
  request.open("GET", "http://" + location.host + "/users/")
  request.send();
  request.onreadystatechange=function () {
    if (request.readyState===4) {
      var response=JSON.parse(request.response);
      var listOfUsers=document.createElement("ul")
      for (var i = 0; i < response.length; i++) {
        var listItem=document.createElement("li")
        listItem.innerText=response[i].username
        listOfUsers.appendChild(listItem)
      }
      var main=document.querySelector(".main")
      main.innerText=""
      main.appendChild(listOfUsers)
      }
    }
})

var loginLink=document.querySelector(".login")
var registerLink=document.querySelector(".register")
var logoutLink=document.querySelector(".logout")
function displayLoginControls() {
  if (localStorage.getItem("username")!==null) {
    loginLink.parentElement.style.display="none"
    registerLink.parentElement.style.display="none"
    logoutLink.parentElement.style.display="inline"
  }
  else {
    loginLink.parentElement.style.display="inline"
    registerLink.parentElement.style.display="inline"
    logoutLink.parentElement.style.display="none"
  }
}
logoutLink.addEventListener("click", function () {
  localStorage.removeItem("username")
  displayLoginControls()
})
displayLoginControls()
