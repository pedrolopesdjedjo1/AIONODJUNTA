const express = require("express");
const authenticate = require("../middleware/auth");

const {
  submitKyc,
  getMyKyc
} = require("../controllers/kyc.controller");

const router = express.Router();

router.post("/", authenticate, submitKyc);
router.get("/me", authenticate, getMyKyc);

module.exports = router;
