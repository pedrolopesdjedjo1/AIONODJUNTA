const express = require("express");

const authenticate = require("../middleware/auth");
const authorize = require("../middleware/role");

const {
  getAuditLogs
} = require("../controllers/audit.controller");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  getAuditLogs
);

module.exports = router;
