const { Router } = require("express");
const ProductsRouter = Router();


const{getProduct,postProducts,ProductsId}=require("../controllers/Products")

ProductsRouter.get("/:id",ProductsId);
ProductsRouter.get("/",getProduct);

ProductsRouter.post("/",postProducts);

module.exports = ProductsRouter;