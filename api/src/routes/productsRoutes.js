const { Router } = require("express");
const {
  getProducts,
  getStatusCero,
  postProducts,
  productsId,
  deleteProducts,
  restoreProducts,
  updateProducts,
  pageCurrent,
  sortProducts,
} = require("../controllers/productsController");
const fileupload = require("express-fileupload");
const router = Router();

router.get("/", getProducts);
router.get("/:id", productsId);
router.get("/status", getStatusCero);
router.post(
  "/",
  fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  postProducts
);
router.delete("/:id", deleteProducts);
router.put("/restore/:id", restoreProducts);
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
