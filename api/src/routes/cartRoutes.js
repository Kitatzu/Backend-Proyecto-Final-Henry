const { Router } = require("express");
const { getCart, createCart} = require("../controllers/cartController");

const router = Router();

router.get("/:id", getCart);
router.post("/", createCart);

module.exports = router;