const express = require("express");

const authenticate = require("../middleware/auth");

const {
  createDeposit,
  createWithdrawal
} = require("../controllers/payment.controller");

const router = express.Router();

router.post(
  "/deposit",
  authenticate,
  createDeposit
);

router.post(
  "/withdrawal",
  authenticate,
  createWithdrawal
);

module.exports = router;
