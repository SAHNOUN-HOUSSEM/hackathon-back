// Import des modèles nécessaires
const EmergencyNotification = require("../models/emergencyNotificationModel");

const notificationsController = {
  // Route handler pour l'envoi de notifications d'urgence
  sendEmergencyNotification: async (req, res) => {
    try {
      const { message, urgencyLevel } = req.body;

      const newEmergencyNotification = new EmergencyNotification({
        message,
        urgencyLevel,
      });

      await newEmergencyNotification.save();

      res.status(201).json(newEmergencyNotification);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification d'urgence :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de l'envoi de la notification d'urgence.",
      });
    }
  },

  // Route handler pour la récupération des détails d'une notification d'urgence
  getNotificationDetails: async (req, res) => {
    try {
      const { notificationId } = req.params;

      const notification = await EmergencyNotification.findById(notificationId);

      if (!notification) {
        return res
          .status(404)
          .json({ error: "La notification d'urgence spécifiée n'existe pas." });
      }

      res.status(200).json(notification);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la notification d'urgence :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la récupération des détails de la notification d'urgence.",
      });
    }
  },

  // Route handler pour la mise à jour du statut d'une notification d'urgence
  updateNotificationStatus: async (req, res) => {
    try {
      const { notificationId } = req.params;
      const { status } = req.body;

      const updatedNotification = await EmergencyNotification.findByIdAndUpdate(
        notificationId,
        { status },
        { new: true }
      );

      if (!updatedNotification) {
        return res
          .status(404)
          .json({ error: "La notification d'urgence spécifiée n'existe pas." });
      }

      res.status(200).json(updatedNotification);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la notification d'urgence :",
        error
      );
      res.status(500).json({
        error:
          "Erreur lors de la mise à jour du statut de la notification d'urgence.",
      });
    }
  },
};

// Exporter le contrôleur des notifications d'urgence
module.exports = notificationsController;
