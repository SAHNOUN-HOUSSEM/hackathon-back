// Import des modèles nécessaires
const HealthInstitution = require("../models/healthInstitutionModel");
const MinistryOfHealth = require("../models/ministryOfHealthModel");
const AnalyticsData = require("../models/analyticsDataModel");

const healthMinistryController = {
  // Route handler pour l'enregistrement du ministère de la santé
  registerMinistryOfHealth: async (req, res) => {
    try {
      if (MinistryOfHealth.find() !== null) return;
      const { name, location, contactNumber } = req.body;

      const newMinistry = new MinistryOfHealth({
        name,
        location,
        contactNumber,
      });

      await newMinistry.save();

      res.status(201).json(newMinistry);
    } catch (error) {
      console.error(
        "Erreur lors de la création du ministère de la santé :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la création du ministère de la santé.",
      });
    }
  },

  // Route handler pour la récupération des détails d'un ministère de la santé
  getMinistryDetails: async (req, res) => {
    try {
      // const { ministryId } = req.params;
      // return res.json("jjj");

      const ministry = await MinistryOfHealth.findOne();

      ministry.healthInstitutions = await HealthInstitution.find();

      if (!ministry) {
        return res
          .status(404)
          .json({ error: "Le ministère spécifié n'existe pas." });
      }

      res.status(200).json(ministry);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du ministère de la santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des détails du ministère de la santé.",
      });
    }
  },

  // Route handler pour la mise à jour des détails d'un ministère de la santé
  updateMinistryDetails: async (req, res) => {
    try {
      const { ministryId } = req.params;
      const { name, location, contactNumber } = req.body;

      const updatedMinistry = await MinistryOfHealth.findByIdAndUpdate(
        ministryId,
        { name, location, contactNumber },
        { new: true }
      );

      if (!updatedMinistry) {
        return res
          .status(404)
          .json({ error: "Le ministère spécifié n'existe pas." });
      }

      res.status(200).json(updatedMinistry);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des détails du ministère de la santé :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la mise à jour des détails du ministère de la santé.",
      });
    }
  },

  // Route handler pour la supervision des institutions de santé par le ministère
  getMinistryInstitutions: async (req, res) => {
    try {
      const { ministryId } = req.params;

      const healthInstitutions = await HealthInstitution.find();

      res.status(200).json(healthInstitutions);
    } catch (error) {
      console.error(
        "Erreur lors de la supervision des institutions de santé par le ministère :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la supervision des institutions de santé par le ministère.",
      });
    }
  },

  // Route handler pour l'accès aux données analytiques par le ministère
  getAnalyticsData: async (req, res) => {
    try {
      const { ministryId } = req.params;

      const analyticsData = await AnalyticsData.find({
        ministryOfHealth: ministryId,
      });

      res.status(200).json(analyticsData);
    } catch (error) {
      console.error(
        "Erreur lors de l'accès aux données analytiques par le ministère :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de l'accès aux données analytiques par le ministère.",
      });
    }
  },
};

// Exporter le contrôleur du ministère de la santé
module.exports = healthMinistryController;
