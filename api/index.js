const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config;
const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`);
  try {
    conn
      .sync()
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log("Error!!");
  }
});
