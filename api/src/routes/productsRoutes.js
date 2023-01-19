const { Router } = require("express");
const {
  getProducts,
  postProducts,
  productsId,
  deleteProducts,
  updateProducts,
} = require("../controllers/productsController");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.post("/", postProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

module.exports = router;
