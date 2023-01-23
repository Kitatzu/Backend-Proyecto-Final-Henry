
require("dotenv").config;
const { PORT } = process.env;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  createRoles,
  createCategories,
  createProviders,
  createBrands,
} = require("./src/middlewares/initServer.js");

server.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`);
  try {
    conn
      .sync()
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
