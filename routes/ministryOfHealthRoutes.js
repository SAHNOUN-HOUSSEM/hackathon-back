const express = require("express");
const router = express.Router();
const ministryOfHealthController = require("../controller/healthMinistryController");

// Routes liées au ministère de la santé
router.post("/register", ministryOfHealthController.registerMinistryOfHealth);
router.get("/", ministryOfHealthController.getMinistryDetails);
router.get("/institutions", ministryOfHealthController.getMinistryInstitutions);
router.put("/:ministryId", ministryOfHealthController.updateMinistryDetails);
router.get(
  "/:ministryId/analytics",
  ministryOfHealthController.getAnalyticsData
);

module.exports = router;
