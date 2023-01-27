const { Router } = require("express");
const router = Router();
const {
  allUsers,
  statusCero,
  deleteUser,
  restoreUser,
  updateUser,
} = require("../controllers/usersController");
const fileupload = require("express-fileupload");

router.get("/", allUsers);
router.get("/status", statusCero);
router.delete("/:id", deleteUser);
router.put("/restore/:id", restoreUser);
router.put(
  "/:id",
  fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateUser
);

module.exports = router;
