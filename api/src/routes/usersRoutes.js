const { Router } = require("express");
const router = Router();
const { allUsers, boxSend } = require("../controllers/usersController");

router.get("/", allUsers);
router.post("/sendmail", boxSend);

module.exports = router;
