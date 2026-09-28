const express = require("express");

const {
  listUsers,
  updateUserStatus,
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

router.patch(
  "/:id/status",
  authorize("ADMIN", "SUPER_ADMIN"),
  updateUserStatus
);

module.exports = router;
