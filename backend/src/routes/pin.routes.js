const express = require("express");
const authenticate = require("../middleware/auth");

const {
  configurePin,
  checkPin
} = require("../controllers/pin.controller");

const router = express.Router();

router.post("/setup", authenticate, configurePin);
router.post("/verify", authenticate, checkPin);

module.exports = router;
