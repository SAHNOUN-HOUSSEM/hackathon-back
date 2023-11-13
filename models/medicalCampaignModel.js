// medicalCampaignModel.js

const mongoose = require("mongoose");

const medicalCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  //add a property location
  location: { type: String },
  // Relation avec d'autres modèles
  analyticsData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnalyticsData",
  },
  // Vous pouvez ajouter d'autres relations au besoin
});

const MedicalCampaign = mongoose.model(
  "MedicalCampaign",
  medicalCampaignSchema
);

module.exports = MedicalCampaign;
