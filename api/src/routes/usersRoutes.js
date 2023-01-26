const { Router } = require("express");
const router = Router();
const { allUsers, updateUser, boxSend  } = require("../controllers/usersController");
const fileupload = require("express-fileupload");

router.post("/sendmail", boxSend);
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
