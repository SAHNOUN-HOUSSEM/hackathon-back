// medicalCampaignRoutes.js

const express = require("express");
const router = express.Router();
const medicalCampaignController = require("../controller/medicalCampaignController");

// Route pour créer une campagne médicale
router.post("/create", medicalCampaignController.createMedicalCampaign);

router.get("/", medicalCampaignController.getAllMedicalCampaign);
// Route pour obtenir les détails d'une campagne médicale
router.get("/:campaignId", medicalCampaignController.getMedicalCampaignDetails);

// Route pour mettre à jour les détails d'une campagne médicale
router.put("/:campaignId", medicalCampaignController.updateMedicalCampaign);

// Route pour supprimer une campagne médicale
router.delete("/:campaignId", medicalCampaignController.deleteMedicalCampaign);

module.exports = router;
