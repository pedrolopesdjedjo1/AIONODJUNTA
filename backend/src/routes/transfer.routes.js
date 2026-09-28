const express = require("express");

const authenticate = require("../middleware/auth");
const {
  createTransfer
} = require("../controllers/transfer.controller");

const router = express.Router();

router.post("/", authenticate, createTransfer);

module.exports = router;
