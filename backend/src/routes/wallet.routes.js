const express = require("express");

const {
  getWallet,
  getTransactions
} = require("../controllers/wallet.controller");

const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, getWallet);
router.get("/transactions", authenticate, getTransactions);

module.exports = router;
