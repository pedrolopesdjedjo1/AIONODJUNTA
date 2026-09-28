const express = require("express");

const authenticate = require("../middleware/auth");

const {
  createAirtime
} = require("../controllers/airtime.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  createAirtime
);

module.exports = router;
