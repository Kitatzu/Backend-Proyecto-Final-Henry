const { io } = require("../app");
const { createNotification } = require("../controllers/createNotification");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");



/* let connectedUsers = []; */
const socket = () => {
  io.on("connection", (socket) => {
    console.log(socket.id, "conectado");
    socket.on("notification", async (data) => {
      console.log(data);
      const response = await createNotification(data);
      console.log(response);
      socket.broadcast.emit("notification", response);
    });
    socket.on("message", async (data) => {
           const { user, content } = data;
      const {userName}=user;
           const message = await createMessage(userName, content);
            socket.broadcast.emit("message", data);
    });


/* connectedUsers.push(socket.id);
socket.on("user connected", connectedUsers);
socket.broadcast.emit("user connected", connectedUsers);


socket.on("disconnect", () => {
  connectedUsers = connectedUsers.filter(user => user !== socket.id);
  socket.broadcast.emit("user connected", connectedUsers);
}); */

    socket.on("get messages", async () => {
      const messages = await getMessages();
      if (messages.length > 0) {
        socket.emit("get messages", messages);
      }
    });
  });
};

//TODO:LISTEN CONNECTIONS
module.exports = socket;
