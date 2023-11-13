// Import des modèles nécessaires
const EmergencyNotification = require("../models/emergencyNotificationModel");
const MedicalRecord = require("../models/medicalRecordModel");
const Patient = require("../models/patientModel");

const patientsController = {
  // Route handler pour l'enregistrement des patients
  registerPatient: async (req, res) => {
    try {
      const { firstName, lastName, gender, birthdate, contactNumber, address } =
        req.body;

      const newPatient = new Patient({
        firstName,
        lastName,
        gender,
        birthdate,
        contactNumber,
        address,
      });

      await newPatient.save();

      res.status(201).json(newPatient);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du patient :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'enregistrement du patient." });
    }
  },

  // Route handler pour la récupération des détails d'un patient
  getPatientDetails: async (req, res) => {
    try {
      const { patientId } = req.params;

      const patient = await Patient.findById(patientId);

      if (!patient) {
        return res
          .status(404)
          .json({ error: "Le patient spécifié n'existe pas." });
      }

      res.status(200).json(patient);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la récupération des détails du patient.",
      });
    }
  },
  // Route handler pour la récupération des détails d'un patient
  getAllPatientDetails: async (req, res) => {
    try {
      const patients = await Patient.find();

      if (!patients) {
        return res
          .status(404)
          .json({ error: "Le patient spécifié n'existe pas." });
      }

      res.status(200).json(patients);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la récupération des détails du patient.",
      });
    }
  },

  // Route handler pour la mise à jour des détails d'un patient
  updatePatientDetails: async (req, res) => {
    try {
      const { patientId } = req.params;
      const { firstName, lastName, gender, birthdate, contactNumber, address } =
        req.body;

      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        { firstName, lastName, gender, birthdate, contactNumber, address },
        { new: true }
      );

      if (!updatedPatient) {
        return res
          .status(404)
          .json({ error: "Le patient spécifié n'existe pas." });
      }

      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des détails du patient :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la mise à jour des détails du patient.",
      });
    }
  },

  // Route handler pour la récupération des dossiers médicaux d'un patient
  getMedicalRecords: async (req, res) => {
    try {
      const { patientId } = req.params;

      const medicalRecords = await MedicalRecord.find({
        patient: patientId,
      }).populate("doctor");

      res.status(200).json(medicalRecords);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des dossiers médicaux du patient :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des dossiers médicaux du patient.",
      });
    }
  },

  // Route handler pour la création d'un nouveau dossier médical pour un patient
  createMedicalRecord: async (req, res) => {
    try {
      const { patientId } = req.params;
      const { doctorId, diagnosis, prescription } = req.body;

      const newMedicalRecord = new MedicalRecord({
        patient: patientId,
        doctor: doctorId,
        diagnosis,
        prescription,
      });

      await newMedicalRecord.save();

      res.status(201).json(newMedicalRecord);
    } catch (error) {
      console.error(
        "Erreur lors de la création du dossier médical pour le patient :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la création du dossier médical pour le patient.",
      });
    }
  },

  // Route handler pour l'envoi de notifications d'urgence à un patient
  sendEmergencyNotification: async (req, res) => {
    try {
      const { patientId } = req.params;
      const { message, urgencyLevel } = req.body;

      const newEmergencyNotification = new EmergencyNotification({
        message,
        urgencyLevel,
        patient: patientId,
      });

      await newEmergencyNotification.save();

      res.status(201).json(newEmergencyNotification);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification d'urgence au patient :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de l'envoi de la notification d'urgence au patient.",
      });
    }
  },
};

// Exporter le contrôleur des patients
module.exports = patientsController;
