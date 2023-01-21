const { Router } = require("express");
const { addSerieProduct } = require("../controllers/seriesController");
const router = Router();

router.post("/", addSerieProduct);

module.exports = router;
