const express = require("express");
const router = express.Router();
const emergencyNotificationController = require("../controller/notificationsController");

// Routes liées aux notifications d'urgence
router.post("/", emergencyNotificationController.sendEmergencyNotification);
router.get(
  "/:notificationId",
  emergencyNotificationController.getNotificationDetails
);
router.put(
  "/:notificationId",
  emergencyNotificationController.updateNotificationStatus
);

module.exports = router;
