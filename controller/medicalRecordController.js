const MedicalRecord = require("../models/medicalRecordModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

const medicalRecordController = {
  // Create a medical record
  createMedicalRecord: async (req, res) => {
    try {
      // Extract data from the request body
      const { patientId, doctorId, diagnosis, prescription } = req.body;

      // Check if patient and doctor exist
      const patient = await Patient.findById(patientId);
      const doctor = await Doctor.findById(doctorId);

      if (!patient || !doctor) {
        return res.status(404).json({ error: "Patient or doctor not found." });
      }

      // Create a new medical record
      const medicalRecord = new MedicalRecord({
        patient: patientId,
        doctor: doctorId,
        diagnosis,
        prescription,
      });

      // Save the medical record
      await medicalRecord.save();

      res.status(201).json({ message: "Medical record created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  // Get details of a medical record
  getMedicalRecordDetails: async (req, res) => {
    try {
      const recordId = req.params.recordId;

      // Check if the medical record exists
      const medicalRecord = await MedicalRecord.findById(recordId).populate(
        "patient doctor"
      );

      if (!medicalRecord) {
        return res.status(404).json({ error: "Medical record not found." });
      }

      res.status(200).json(medicalRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  // Get details of a medical record
  getAllMedicalRecordDetails: async (req, res) => {
    try {
      // Check if the medical record exists
      const medicalRecords = await MedicalRecord.find().populate(
        "patient doctor"
      );

      if (!medicalRecords) {
        return res.status(404).json({ error: "Medical record not found." });
      }

      res.status(200).json(medicalRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  // Update a medical record
  updateMedicalRecord: async (req, res) => {
    try {
      const recordId = req.params.recordId;

      // Check if the medical record exists
      const medicalRecord = await MedicalRecord.findById(recordId);

      if (!medicalRecord) {
        return res.status(404).json({ error: "Medical record not found." });
      }

      // Update medical record details
      medicalRecord.diagnosis = req.body.diagnosis || medicalRecord.diagnosis;
      medicalRecord.prescription =
        req.body.prescription || medicalRecord.prescription;

      // Save the updated medical record
      await medicalRecord.save();

      res.status(200).json({ message: "Medical record updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  // Delete a medical record
  deleteMedicalRecord: async (req, res) => {
    try {
      const recordId = req.params.recordId;

      // Check if the medical record exists
      const medicalRecord = await MedicalRecord.findById(recordId);

      if (!medicalRecord) {
        return res.status(404).json({ error: "Medical record not found." });
      }

      // Delete the medical record
      await medicalRecord.remove();

      res.status(200).json({ message: "Medical record deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
};

module.exports = medicalRecordController;
