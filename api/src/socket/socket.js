const { io } = require("../app");
const { createNotification } = require("../controllers/createNotification");
const { getDataSold } = require("../controllers/dashboardController");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

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
    socket.on("message", async (data) => {
           const { user, content } = data;
      const {userName}=user;
           const message = await createMessage(userName, content);
            socket.broadcast.emit("message", data);
    });

    socket.on("get messages", async () => {
      const messages = await getMessages();
      if (messages.length > 0) {
        socket.emit("get messages", messages);
      }
    });
    socket.on("getDataSold", async () => {
      const promedio = await getDataSold();
      console.log(promedio, "ENTRA PETICION_SOCKET");
      socket.emit("DataSold", promedio);
    });
  });
};

//TODO:LISTEN CONNECTIONS
module.exports = socket;
