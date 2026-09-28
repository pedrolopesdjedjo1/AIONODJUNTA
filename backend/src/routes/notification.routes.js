const express = require("express");

const authenticate = require("../middleware/auth");

const {
  getNotifications,
  markAsRead,
  markAllAsRead
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/", authenticate, getNotifications);

router.patch("/read-all", authenticate, markAllAsRead);

router.patch("/:id/read", authenticate, markAsRead);

module.exports = router;
