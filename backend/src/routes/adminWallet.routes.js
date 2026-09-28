const express = require("express");

const {
  listWallets,
} = require("../controllers/adminWallet.controller");

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.use(auth);

router.get(
  "/",
  authorize("ADMIN", "SUPER_ADMIN"),
  listWallets
);

module.exports = router;
