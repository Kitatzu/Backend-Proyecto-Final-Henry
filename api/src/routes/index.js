const { Router } = require("express");
const router = Router();
const ProductsRouter=require("./ProductsRouter");
const categoriesRouter = require("./categoriesRouter");
const providersRouter=require("./providersRouter");

router.use("/categories", categoriesRouter);
router.use("/products",ProductsRouter);
router.use("/providers",providersRouter);


module.exports = router;
