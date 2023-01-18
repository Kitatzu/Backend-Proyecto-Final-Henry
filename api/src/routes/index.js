const { Router } = require("express");
const router = Router();
const ProductsRouter=require("./ProductsRouter")

router.use("/products",ProductsRouter);

module.exports = router;
