const { Router } = require("express");
const {
  saveReview,
  validateRating,
} = require("../controllers/reviewController");
const router = Router();

router.post("/", saveReview);
router.put("/", validateRating);

module.exports = router;
