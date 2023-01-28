const { Router } = require("express");
const { createFactura } = require("../controllers/facturaController");
const router = Router();

router.post("/", createFactura);

module.exports = router;
