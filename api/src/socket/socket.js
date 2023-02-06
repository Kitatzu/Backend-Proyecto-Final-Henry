const { io } = require("../app");
const { createNotification } = require("../controllers/createNotification");

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
    socket.on("message", (message) => {
      console.log(message);
      socket.broadcast.emit("message", {
        body: message,
      });
    });
  });
};
//TODO:LISTEN CONNECTIONS
module.exports = socket;
