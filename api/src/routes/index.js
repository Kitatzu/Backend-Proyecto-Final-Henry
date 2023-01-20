const { Router } = require("express");
const router = Router();
const ProductsRoutes = require("./ProductsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const providersRoutes = require("./providersRoutes");
const searchRoutes = require("./SearchRoutes");
const filterByBrandRoutes = require("./filterByBrandRoutes");
const filterByCategoryRoutes = require("./filterByCategoriesRoutes");

router.use("/categories", categoriesRoutes);
router.use("/products", ProductsRoutes);
router.use("/providers", providersRoutes);
router.use("/search", searchRoutes);
router.use("/brand", filterByBrandRoutes);
router.use("/filter", filterByCategoryRoutes);

module.exports = router;
