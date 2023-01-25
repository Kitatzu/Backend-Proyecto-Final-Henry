const { Router } = require("express");
const {
  getProducts,
  postProducts,
  productsId,
  deleteProducts,
  updateProducts,
  pageCurrent,
  sortProducts,
} = require("../controllers/productsController");
const fileupload = require("express-fileupload");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.post(
  "/",
  fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  postProducts
);
router.delete("/:id", deleteProducts);
router.put(
  "/:id",
  fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateProducts
);
router.get("/page/:id", pageCurrent);
router.get("/sort/:id", sortProducts);

module.exports = router;
