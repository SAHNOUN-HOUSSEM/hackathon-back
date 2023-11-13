const express = require("express");
const {
  registerDoctor,
  getDoctorDetails,
  updateDoctorDetails,
  getDoctorPatients,
  doctorLogin,
  getAllDoctor,
} = require("../controller/doctorsController");
const router = express.Router();
// Routes liées aux médecins
router.post("/register", registerDoctor);
router.get("/", getAllDoctor);
router.get("/:doctorId", getDoctorDetails);
router.put("/:doctorId", updateDoctorDetails);
router.get("/:doctorId/patients", getDoctorPatients);
router.post("/login", doctorLogin);

module.exports = router;
