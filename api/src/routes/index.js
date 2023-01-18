const { Router } = require("express");
const router = Router();
const ProductsRouter=require("./ProductsRouter");
const categoriesRouter = require("./categoriesRouter");

router.use("/categories", categoriesRouter);
router.use("/products",ProductsRouter);


module.exports = router;
