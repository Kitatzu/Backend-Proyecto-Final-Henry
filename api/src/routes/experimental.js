const { Router } = require("express");
const { SetProveedores } = require("../controllers/Prueba");
const experimentalRoute = Router();

experimentalRoute.post("/", SetProveedores);
module.exports = experimentalRoute;
