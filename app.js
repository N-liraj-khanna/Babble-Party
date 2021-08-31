/* Imports */
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMsg = require("./utils/messages");
const {createUser, getCurrentUser, getUsersRoom, removeUser} = require("./utils/users");

/* Constants */
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Babble Bot";

/* Middlewares */
app.use(express.static(path.join(__dirname, "public")));

/* Socket IO Configuration */
// Run when user/client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {

    const user = createUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit("message", formatMsg(botName, "Welcome to Babble Party!")); // Only to the user

    socket.broadcast.to(user.room).emit(
      "message",
      formatMsg(botName, user.username+" has joined the room.")
    ); // To everyone except the user came in
    
      // Send users available and room info to client side
      io.to(user.room).emit("usersAndRoomInfo", {
        room: user.room,
        users: getUsersRoom(user.room)
      });
  });

  // Listen for messages from client side
  socket.on("chatMessage", (msg) => {
    const user=getCurrentUser(socket.id);
    io.emit("message", formatMsg(user.username, msg));
  });

  // io.emit()  // To everyone in connection!
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if(user){
      io.to(user.room).emit("message", formatMsg(botName, user.username+" has disconnected."));
      // Send users available and room info to client side
      io.to(user.room).emit("usersAndRoomInfo", {
        room: user.room,
        users: getUsersRoom(user.room)
      });
    }

  });

});

/* General Config */
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
