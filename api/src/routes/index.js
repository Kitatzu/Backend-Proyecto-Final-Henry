const { Router } = require("express");
const router = Router();
const ProductsRoutes = require("./ProductsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const providersRoutes = require("./providersRoutes");

router.use("/categories", categoriesRoutes);
router.use("/products", ProductsRoutes);
router.use("/providers", providersRoutes);

module.exports = router;
