// studentRoutes.js

const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Route pour créer un étudiant
router.post("/register", studentController.registerStudent);

// Route pour obtenir les détails d'un étudiant
router.get("/:studentId", studentController.getStudentDetails);

// Route pour mettre à jour les détails d'un étudiant
router.put("/:studentId", studentController.updateStudentDetails);

// Route pour supprimer un étudiant
router.delete("/:studentId", studentController.deleteStudent);
// Route pour connecter un étudiant
router.post("/login", studentController.loginStudent);

module.exports = router;
