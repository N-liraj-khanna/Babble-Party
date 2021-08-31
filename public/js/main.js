const socket = io();

// Get username and room through URL (QS CDN)
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

// JoinRoom request from client side
socket.emit('joinRoom',{username, room})

const form = document.getElementById("chat-form");
const chatMessages=document.querySelector(".chat-messages");

// Manipulates DOM in adding the messages
const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.message}</p>`;

  const messageList = document.querySelector(".chat-messages");
  messageList.appendChild(div);
}

// Displays messaes
socket.on('message',message=>{
  console.log(message);
  outputMessage(message);

  // Scroll to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});

// Chat Message Submitted
form.addEventListener("submit", (e)=>{
  e.preventDefault();

  // get chat message
  const msg=e.target.elements.msg.value;
  socket.emit("chatMessage",msg);

  // clear input textbox
  e.target.elements.msg.value="";
  e.target.elements.msg.focus();
});

// Setting room name
socket.on("usersAndRoomInfo", ({room, users})=>{
  const roomName=document.getElementById("room-name");
  roomName.innerHTML=room;

  const usersInfo = document.getElementById("users");
  // console.log(users);
  usersInfo.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`
});