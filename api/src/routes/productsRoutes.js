const { Router } = require("express");
const {
  getProducts,
  postProducts,
  productsId,
  deleteProducts,
  updateProducts,
} = require("../controllers/productsController");
const { productsByBrand } = require("../database/filterByBrand");
const { productsByCategory } = require("../database/filterByCategory");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.get("/brand/:brand", productsByBrand);
router.get("/category/:category", productsByCategory);
router.post("/", postProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

module.exports = router;
