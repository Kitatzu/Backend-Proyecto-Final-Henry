const { io } = require("../app");
const { createNotification } = require("../controllers/createNotification");
const { createMessage, getMessages } = require('../controllers/messageController');

//TODO: LISTEN CONNECTIONS
const socket = () => {
  io.on("connection", (socket) => {
    console.log(socket.id, "conectado");
    socket.on("notification", async (data) => {
      console.log(data);
      const response = await createNotification(data);
      console.log(response);
      socket.broadcast.emit("notification", response);
    });
    /* socket.on("new message", async (username, messageContent) => {
      console.log(message);
      socket.broadcast.emit("message", {
        body: message,
      });
    }); */

    socket.on('message', async (userName, messageContent) => {
      console.log(userName)
      console.log(messageContent)
      const message = await createMessage(userName, messageContent);
      socket.broadcast.emit('message', {content:message});
    });
  
    socket.on('get messages', async () => {
      const messages = await getMessages();
      socket.emit('get messages', messages);
    });

  });
};


//TODO:LISTEN CONNECTIONS
module.exports = socket;
