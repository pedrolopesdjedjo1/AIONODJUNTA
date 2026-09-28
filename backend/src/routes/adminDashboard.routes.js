const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminDashboard.controller");

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.use(auth);

router.get(
  "/stats",
  authorize("ADMIN", "SUPER_ADMIN"),
  getDashboardStats
);

module.exports = router;
