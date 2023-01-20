const { Router } = require("express");
const router = Router();
const { allUsers } = require("../controllers/usersController");

router.get("/", allUsers);

module.exports = router;
