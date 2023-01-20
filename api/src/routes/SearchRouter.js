const {Router}=require("express");
const SearchRouter=Router();

const {search}=require("../controllers/Search");

SearchRouter.get("/",search);

module.exports= SearchRouter;