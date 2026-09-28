const express = require("express");

const {
  listUsers,
  updateUserStatus,
  getUserDetails,
} = require("../controllers/adminUser.controller");

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.use(auth);

router.get(
  "/",
  authorize("ADMIN", "SUPER_ADMIN"),
  listUsers
);

router.get(
  "/:id",
  authorize("ADMIN", "SUPER_ADMIN"),
  getUserDetails
);

router.patch(
  "/:id/status",
  authorize("ADMIN", "SUPER_ADMIN"),
  updateUserStatus
);

module.exports = router;
