const { Router } = require("express");
const router = Router();
const ProductsRouter=require("./ProductsRouter");
const categoriesRouter = require("./categoriesRouter");
const providersRouter=require("./providersRouter");
const SearchRouter=require("./SearchRouter");

router.use("/categories", categoriesRouter);
router.use("/products",ProductsRouter);
router.use("/providers",providersRouter);
router.use("/search",SearchRouter);


module.exports = router;
