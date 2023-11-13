// studentController.js

const Student = require("../models/studentModel");
const HealthInstitution = require("../models/healthInstitutionModel");
const bcrypt = require("bcrypt"); // Assurez-vous d'avoir bcrypt installé : npm install bcrypt

// Contrôleur pour connecter un étudiant
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'étudiant existe
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Vous pouvez générer un jeton d'authentification ici si nécessaire

    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour créer un étudiant
module.exports.registerStudent = async (req, res) => {
  try {
    const { healthInstitutionId, ...studentData } = req.body;

    // Vérifier si l'institution de santé existe
    const healthInstitution = await HealthInstitution.findById(
      healthInstitutionId
    );
    if (!healthInstitution) {
      return res
        .status(404)
        .json({ message: "Institution de santé non trouvée" });
    }

    // Ajouter l'étudiant à l'institution de santé
    const newStudent = await Student.create(studentData);
    healthInstitution.students.push(newStudent._id);
    await healthInstitution.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour obtenir les détails d'un étudiant
module.exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour mettre à jour les détails d'un étudiant
module.exports.updateStudentDetails = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour supprimer un étudiant
module.exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.studentId
    );
    if (!deletedStudent) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    // Retirer l'étudiant de l'institution de santé
    const healthInstitution = await HealthInstitution.findOne({
      students: req.params.studentId,
    });
    if (healthInstitution) {
      healthInstitution.students.pull(req.params.studentId);
      await healthInstitution.save();
    }

    res.status(200).json({ message: "Étudiant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
