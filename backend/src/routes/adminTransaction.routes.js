const express = require("express");

const {
  listTransactions,
} = require("../controllers/adminTransaction.controller");

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.use(auth);

router.get(
  "/",
  authorize("ADMIN", "SUPER_ADMIN"),
  listTransactions
);

module.exports = router;
