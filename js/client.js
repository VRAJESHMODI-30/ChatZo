const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

//Notification sound:-
var audio = new Audio("Matrial/notifi.mp3");
audio.volume = 0.3;

//Create new div class in your html file:-
const addHTML = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  if (position != "mid") {
    messageElement.classList.add("message");
  }
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  //sound will not play for sender
  //   if (position != "right") {
  //     audio.play();
  //   }
};

//For submit/sending the message by user:-
form.addEventListener("submit", (e) => {
  e.preventDefault(); //Page will not reload everytime when this call fire
  const message = messageInput.value;
  if (message != "") {
    addHTML(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
  }
});
const Name = prompt("Enter your name to join");
socket.emit("new-user-joined", Name);

socket.on("user-joined", (name) => {
  addHTML(`${name} joined the chat`, "mid");
  online.push(Name);
});

socket.on("receive", (data) => {
  addHTML(`${data.Name}: ${data.message}`, "left");
});

socket.on("leave", (name) => {
  addHTML(`${name} left the chat`, "mid");
});
