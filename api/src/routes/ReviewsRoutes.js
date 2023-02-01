const { Router } = require("express");
const { saveReview } = require("../controllers/reviewController");
const router = Router();

router.post("/", saveReview);

module.exports = router;
