const { Router } = require("express");
const {
  getProducts,
  postProducts,
  productsId,
  deleteProducts,
  updateProducts,
  pageCurrent,
} = require("../controllers/productsController");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.post("/", postProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);
router.get("/page/:id", pageCurrent);

module.exports = router;
