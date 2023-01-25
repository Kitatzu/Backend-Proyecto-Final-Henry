const { Router } = require("express");
const router = Router();
const { allUsers, updateUser } = require("../controllers/usersController");
const fileupload = require("express-fileupload");

router.get("/", allUsers);
router.put(
  "/:id",
  fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateUser
);

module.exports = router;
