const { Router } = require("express");
const {
  createFactura,
  geTfacturas,
  getAllFacturas,
  getFacturaDetail,
} = require("../controllers/facturaController");
const router = Router();

router.post("/", createFactura);
router.get("/all", getAllFacturas);
router.get("/user/:userId", geTfacturas);
router.get("/detail/:facturaId", getFacturaDetail);

module.exports = router;
