const express = require("express");

const {
  listPendingKyc,
  reviewKyc,
} = require("../controllers/adminKyc.controller");

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.use(auth);

router.get(
  "/pending",
  authorize("ADMIN", "SUPER_ADMIN"),
  listPendingKyc
);

router.patch(
  "/:id/review",
  authorize("ADMIN", "SUPER_ADMIN"),
  reviewKyc
);

module.exports = router;
