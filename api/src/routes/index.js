const { Router } = require("express");
const router = Router();
const categoriesRouter = require("./categoriesRouter");
router.use("/categories", categoriesRouter)

module.exports = router;
