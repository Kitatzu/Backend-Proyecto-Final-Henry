const { server } = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  createRoles,
  createCategories,
  createProviders,
  createBrands,
} = require("./src/middlewares/initServer.js");
//TODO: SOCKET
const socket = require("./src/socket/socket.js");

socket();

//TODO: SOCKET
server.listen(3001, () => {
  console.log("%s listening at 3001");
  try {
    conn
      .sync({ force: false })
      .then((response) => {
        createRoles();
        createCategories();
        createProviders();
        createBrands();
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log("Error!!");
  }
});
