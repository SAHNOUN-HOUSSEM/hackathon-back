const express = require("express");
const router = express.Router();
const healthInstitutionController = require("../controller/institutionsController");

// Routes liées aux institutions de santé
router.post("/register", healthInstitutionController.registerHealthInstitution);
router.get("/", healthInstitutionController.getAllHealthInstitutions);
router.get(
  "/:institutionId",
  healthInstitutionController.getInstitutionDetails
);
router.put(
  "/:institutionId",
  healthInstitutionController.updateInstitutionDetails
);
router.get(
  "/:institutionId/doctors",
  healthInstitutionController.getInstitutionDoctors
);
router.get(
  "/:institutionId/orders",
  healthInstitutionController.getInstitutionOrders
);
router.post("/:institutionId/orders", healthInstitutionController.placeOrder);

module.exports = router;
