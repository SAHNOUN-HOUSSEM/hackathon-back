// medicalCampaignController.js

const MedicalCampaign = require("../models/medicalCampaignModel");

// Contrôleur pour créer une campagne médicale
module.exports.createMedicalCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      analyticsData, // Make sure to pass the analyticsData as needed
      doctors, // Make sure to pass the doctors as needed
    } = req.body;

    const medicalCampaign = new MedicalCampaign({
      title,
      description,
      startDate,
      endDate,
      location,
      analyticsData,
      doctors,
    });

    const savedCampaign = await medicalCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getAllMedicalCampaign = async (req, res) => {
  try {
    const medicalCampaigns = await MedicalCampaign.find().populate("doctors");

    res.status(201).json(medicalCampaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Contrôleur pour obtenir les détails d'une campagne médicale
module.exports.getMedicalCampaignDetails = async (req, res) => {
  try {
    const campaign = await MedicalCampaign.findById(req.params.campaignId)
      .populate("analyticsData")
      .populate("doctors")
      .exec();

    if (!campaign) {
      return res.status(404).json({ message: "Medical Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Contrôleur pour mettre à jour les détails d'une campagne médicale
module.exports.updateMedicalCampaign = async (req, res) => {
  try {
    const updatedCampaign = await MedicalCampaign.findByIdAndUpdate(
      req.params.campaignId,
      req.body,
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Medical Campaign not found" });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Contrôleur pour supprimer une campagne médicale
module.exports.deleteMedicalCampaign = async (req, res) => {
  try {
    const deletedCampaign = await MedicalCampaign.findByIdAndRemove(
      req.params.campaignId
    );

    if (!deletedCampaign) {
      return res.status(404).json({ message: "Medical Campaign not found" });
    }

    res.status(200).json({ message: "Medical Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
