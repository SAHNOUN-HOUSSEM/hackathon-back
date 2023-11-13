// Import des modèles nécessaires
const Doctor = require("../models/doctorModel");
const HealthInstitution = require("../models/healthInstitutionModel");
const Inventory = require("../models/inventoryModel");
const Order = require("../models/orderModel");
const Patient = require("../models/patientModel");

const institutionsController = {
  // Route handler pour l'enregistrement des institutions de santé
  registerHealthInstitution: async (req, res) => {
    try {
      const { name, type, location, contactNumber } = req.body;

      const newInstitution = new HealthInstitution({
        name,
        type,
        location,
        contactNumber,
      });

      await newInstitution.save();

      res.status(201).json(newInstitution);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'institution de santé :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de l'enregistrement de l'institution de santé.",
      });
    }
  },

  // Route handler pour obtenir toutes les institutions de santé
  getAllHealthInstitutions: async (req, res) => {
    try {
      const allInstitutions = await HealthInstitution.find();
      res.status(200).json({ success: true, data: allInstitutions });
    } catch (error) {
      console.error("Error fetching health institutions:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },

  // Route handler pour la récupération des médecins affiliés à une institution de santé
  getInstitutionDoctors: async (req, res) => {
    try {
      const { institutionId } = req.params;

      const doctors = await Doctor.find({ healthInstitution: institutionId });

      res.status(200).json(doctors);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des médecins de l'institution de santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des médecins de l'institution de santé.",
      });
    }
  },

  // Route handler pour la gestion des rendez-vous, admissions et traitements des patients
  managePatientAppointments: async (req, res) => {
    try {
      const { institutionId } = req.params;

      const patients = await Patient.find({
        healthInstitution: institutionId,
      }).populate("medicalRecords");

      res.status(200).json(patients);
    } catch (error) {
      console.error(
        "Erreur lors de la gestion des rendez-vous, admissions et traitements des patients :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la gestion des rendez-vous, admissions et traitements des patients.",
      });
    }
  },

  // Route handler pour la gestion des stocks et des commandes
  manageInventory: async (req, res) => {
    try {
      const { institutionId } = req.params;

      const inventory = await Inventory.findOne({
        healthInstitution: institutionId,
      }).populate("items");

      res.status(200).json(inventory);
    } catch (error) {
      console.error(
        "Erreur lors de la gestion des stocks et des commandes :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la gestion des stocks et des commandes.",
      });
    }
  },

  // Route handler pour la gestion des commandes pour les articles nécessaires
  placeOrder: async (req, res) => {
    try {
      const { institutionId } = req.params;
      const { items } = req.body;

      const newOrder = new Order({
        items,
        status: "En attente",
        healthInstitution: institutionId,
      });

      await newOrder.save();

      const institution = await HealthInstitution.findById(institutionId);
      institution.orders.push(newOrder._id);
      await institution.save();

      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Erreur lors de la gestion des commandes :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la gestion des commandes." });
    }
  },

  // Route handler pour la récupération des détails d'une institution de santé
  getInstitutionDetails: async (req, res) => {
    try {
      const { institutionId } = req.params;

      const institution = await HealthInstitution.findById(institutionId);

      if (!institution) {
        return res
          .status(404)
          .json({ error: "L'institution de santé spécifiée n'existe pas." });
      }

      res.status(200).json(institution);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'institution de santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des détails de l'institution de santé.",
      });
    }
  },

  // Route handler pour la mise à jour des détails d'une institution de santé
  updateInstitutionDetails: async (req, res) => {
    try {
      const { institutionId } = req.params;
      const { name, type, location, contactNumber } = req.body;

      const updatedInstitution = await HealthInstitution.findByIdAndUpdate(
        institutionId,
        { name, type, location, contactNumber },
        { new: true }
      );

      if (!updatedInstitution) {
        return res
          .status(404)
          .json({ error: "L'institution de santé spécifiée n'existe pas." });
      }

      res.status(200).json(updatedInstitution);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des détails de l'institution de santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la mise à jour des détails de l'institution de santé.",
      });
    }
  },

  // Route handler pour la récupération des commandes d'une institution de santé
  getInstitutionOrders: async (req, res) => {
    try {
      const { institutionId } = req.params;

      const orders = await Order.find({
        healthInstitution: institutionId,
      }).populate("items");

      res.status(200).json(orders);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commandes de l'institution de santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des commandes de l'institution de santé.",
      });
    }
  },
};

// Exporter le contrôleur des institutions de santé
module.exports = institutionsController;
