const { Router } = require("express");
const {
  getProducts,
  postProducts,
  productsId,
  deleteProducts,
  updateProducts,
  pageCurrent,
  sortProducts,
} = require("../controllers/productsController");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.post("/", postProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);
router.get("/page/:id", pageCurrent);
router.get("/sort/:id", sortProducts);

module.exports = router;
