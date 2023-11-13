const express = require("express");
const patientsController = require("../controller/patientsController");
const router = express.Router();

// Routes liées aux patients
router.post("/register", patientsController.registerPatient);
router.get("/", patientsController.getAllPatientDetails);
router.get("/:patientId", patientsController.getPatientDetails);
router.put("/:patientId", patientsController.updatePatientDetails);
router.get("/:patientId/medical-records", patientsController.getMedicalRecords);
router.post(
  "/:patientId/emergency-notifications",
  patientsController.sendEmergencyNotification
);

module.exports = router;
