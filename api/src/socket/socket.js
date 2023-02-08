const { io } = require("../app");
const { createNotification } = require("../controllers/createNotification");
const {
  getDataSold,
  sumUsers,
  getDataProductsSold,
} = require("../controllers/dashboardController");
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
      const { userName } = user;
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
      socket.emit("DataSold", promedio);
    });
    socket.on("sendDataSold", async () => {
      const promedio = await getDataSold();
      socket.broadcast.emit("DataSold", promedio);
    });
    socket.on("getSumUsers", async () => {
      const users = await sumUsers();
      socket.emit("sumUsers", users);
    });
    socket.on("sendSumUsers", async () => {
      const users = await sumUsers();
      socket.broadcast.emit("sumUsers", users);
    });
    socket.on("getProductSold", async () => {
      const data = await getDataProductsSold();
      socket.emit("getProductSold", data);
    });
    socket.on("sendProductSold", async () => {
      const data = await getDataProductsSold();
      socket.broadcast.emit("getProductSold", data);
    });
  });
};

//TODO:LISTEN CONNECTIONS
module.exports = socket;
