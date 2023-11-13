const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controller/medicalRecordController");

// Route to create a medical record
router.post("/create", medicalRecordController.createMedicalRecord);

router.get("/", medicalRecordController.getAllMedicalRecordDetails);
// Route to get details of a medical record
router.get("/:recordId", medicalRecordController.getMedicalRecordDetails);

// Route to update a medical record
router.put("/:recordId", medicalRecordController.updateMedicalRecord);

// Route to delete a medical record
router.delete("/:recordId", medicalRecordController.deleteMedicalRecord);

module.exports = router;
