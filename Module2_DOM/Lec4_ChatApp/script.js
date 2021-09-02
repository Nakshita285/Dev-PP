let chatInput = document.querySelector(".input-box input");
let chatWindow = document.querySelector(".chat-window");
let username = prompt("Enter your Username:")
chatInput.addEventListener( "keypress", function(e){
    // console.log(e);
    if(e.key == "Enter" && chatInput.value){
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent = username+ ": "+chatInput.value;
        chatWindow.append(chatDiv);
        chatInput.value = "";
    }
    
})