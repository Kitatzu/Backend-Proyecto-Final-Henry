const { Router } = require("express");
const categoriesRouter = Router();
const { getAllCategories,createCategory, updateCategory, deleteCategory } = require("../controllers/getCategories");

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/",createCategory);
categoriesRouter.put("/:id",updateCategory);
categoriesRouter.delete("/:id",deleteCategory);


module.exports = categoriesRouter;