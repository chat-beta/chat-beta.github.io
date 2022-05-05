const socket = new WebSocket("wss://wef.absq.repl.co", "packrunner")
let username = "User" + makeRandomChar(5)

window.onload = function(){
        
    
                
               
                document.getElementById("users").innerHTML = ""

                socket.onopen = () => {
                  var randomColor = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

                  socket.send(JSON.stringify({types: "CREATE_MESSAGE", author: "CONSOLE", message: "Welcome, " + username + "."}))
                  socket.send(JSON.stringify({types: "ADD_USER", username: username, image: "https://dummyimage.com/500x500/" + randomColor + "/ffffff.png&text=" + username.charAt(0)}))
                  socket.send(JSON.stringify({types: "GET_USERS"}))
                  }


                socket.onmessage = (a) => {
                  let json = JSON.parse(a.data)

                  if(json.types == "GET_USERS")
                  {

                    document.getElementById("users").innerHTML = ""
                    for (let x = 0; x < json.users.length; x ++) {

                      let user = document.createElement("DIV")
                      user.className = "user"
                      let insideDiv = document.createElement("DIV")
                      insideDiv.style.textAlign = "center"
                      let username = document.createElement("LABEL")
                      username.className = "userName"
                      username.innerText = json.users[x].username
                      let profileImage = document.createElement("IMG")
                      profileImage.src = json.users[x].image
                      let lineBreak1 = document.createElement("BR")
                      let lineBreak2 = document.createElement("BR")
                      insideDiv.appendChild(username)
                      insideDiv.appendChild(lineBreak1)
                      insideDiv.appendChild(lineBreak2)
                      insideDiv.appendChild(profileImage)
                      user.appendChild(insideDiv)
                      document.getElementById("users").appendChild(user)


                    }
                  
                
                   

                  }
                  else if(json.types == "USER_UPDATE")
                  {

                    document.getElementById("users").innerHTML = ""
                    for (let x = 0; x < json.users.length; x ++) {

                      let user = document.createElement("DIV")
                      user.className = "user"
                      let insideDiv = document.createElement("DIV")
                      insideDiv.style.textAlign = "center"
                      let username = document.createElement("LABEL")
                      username.className = "userName"
                      username.innerText = json.users[x].username
                      let profileImage = document.createElement("IMG")
                      profileImage.src = json.users[x].image
                      let lineBreak1 = document.createElement("BR")
                      let lineBreak2 = document.createElement("BR")
                      insideDiv.appendChild(username)
                      insideDiv.appendChild(lineBreak1)
                      insideDiv.appendChild(lineBreak2)
                      insideDiv.appendChild(profileImage)
                      user.appendChild(insideDiv)
                      document.getElementById("users").appendChild(user)


                    }

                  }
                  else if(json.types == "RECIEVE_MESSAGE")
                  {
                    appendMessage(json.author, json.message)
                  }
                  
                  }




                  document.getElementById("sendButton").addEventListener("click" , function(){

                    if(document.getElementById("messageText").value == "" || document.getElementById("messageText").value.replace(/ /g, "") == "")
                    {
                      alert("Enter a message!")
                    }
                    else{
                    socket.send(JSON.stringify({types: "CREATE_MESSAGE", author: username, message: document.getElementById("messageText").value}))
                    document.getElementById("messageText").value = ""
                    

                    }
                  
                  })

                 


             
}


function makeRandomChar(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


function appendMessage(username, message){

  let div = document.createElement("DIV")
  div.className = "messageDiv"
  let label = document.createElement("LABEL")
  label.style.fontWeight = "600"
  label.innerText = username
  let p = document.createElement("P")
  p.style.fontSize = "15px"
  p.innerText = message
  div.appendChild(label)
  div.appendChild(p)
  document.getElementById("messages").appendChild(div)


  var element = document.getElementById("right");
element.scrollTop = element.scrollHeight;


}



function resetCaret(){
  document.getElementById("messageText").remove()


}


