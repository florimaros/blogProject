var string="hello world"
function writeToConsole() {
  console.log(string[0])
}
var studentsList={id:12, name:"peti"}
for (var i = 0; i < string.length; i++) {
  if (i%2===0) {
    console.log(string[i])
  }
}

var listOfElements=[1, 2, 3]
var summa=[]
for (var i = 0; i < listOfElements.length; i++){
  if (listOfElements[i]%2===0 || i===0 ) {
    summa.push(listOfElements[i])
  }
}

var emptyList=[]
for (var i = 1; i < 100; i++) {
  if (i%2===0) {
    emptyList.push(i)
  }
}
var counter=0
for (var i = 0; i < emptyList.length; i++) {
  if (emptyList[i]%12===0) {
    counter+=1
  }
}

function callBackFun(cb) {
  console.log("hello world")
  setTimeout(cb, 5000)
}
callBackFun(writeToConsole)
