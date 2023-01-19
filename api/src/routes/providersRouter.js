const { Router } = require("express");
const providersRouter = Router();
const { getAllProviders,createProvider, updateProvider, deleteProvider } = require("../controllers/getProviders");

providersRouter.get("/", getAllProviders);
providersRouter.post("/",createProvider);
providersRouter.put("/:id",updateProvider);
providersRouter.delete("/:id",deleteProvider);


module.exports = providersRouter;