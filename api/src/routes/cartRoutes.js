const { Router } = require("express");
const { getCart, createCart} = require("../controllers/cartController.js");

const router = Router();

router.get("/:userId", getCart);
router.post("/", createCart);

module.exports = router;