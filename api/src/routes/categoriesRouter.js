const { Router } = require("express");
const categoriesRouter = Router();
const { getAllCategories,createCategory, updateCategory, deleteCategory } = require("../controllers/getCategories");
const{checkCreateCategory}=require("../middleware/checkCreateCategory");

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/",checkCreateCategory,createCategory);
categoriesRouter.put("/:id",updateCategory);
categoriesRouter.delete("/:id",deleteCategory);


module.exports = categoriesRouter;