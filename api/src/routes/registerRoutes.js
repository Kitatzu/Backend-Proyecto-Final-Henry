const { Router } = require("express");
const router = Router();
const { register } = require("../controllers/registerController.js");

router.post("/", register);

module.exports = router;
