const { Router } = require("express");
const router = Router();
const ProductsRoutes = require("./ProductsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const providersRoutes = require("./providersRoutes");
const searchRoutes = require("./SearchRoutes");
const filterByBrandRoutes = require("./filterByBrandRoutes");
const filterByCategoryRoutes = require("./filterByCategoriesRoutes");
const registerRoutes = require("./registerRoutes");
const loginRoutes = require("./loginRoutes");
const usersRoutes = require("./usersRoutes");
const seriesRoute = require("./seriesRoute");
const brandsRoutes = require("./brandsRoutes");
const verificationRoutes=require("./verificationRoutes")

router.use("/categories", categoriesRoutes);
router.use("/products", ProductsRoutes);
router.use("/providers", providersRoutes);
router.use("/search", searchRoutes);
router.use("/series", seriesRoute);
router.use("/brand", filterByBrandRoutes);
router.use("/filter", filterByCategoryRoutes);
router.use("/register", registerRoutes);
router.use("/login", loginRoutes);
router.use("/brands", brandsRoutes);
router.use("/users", usersRoutes);
router.use("/verification",verificationRoutes);

module.exports = router;
