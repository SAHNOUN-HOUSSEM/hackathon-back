// Import des modèles nécessaires
const Delivery = require("../models/deliveryModel");
const HealthInstitution = require("../models/healthInstitutionModel");
const InventoryItem = require("../models/inventoryItemModel");
const Inventory = require("../models/inventoryModel");
const Order = require("../models/orderModel");

const inventoriesController = {
  // Route handler pour l'enregistrement des inventaires
  createInventory: async (req, res) => {
    try {
      const { name, description } = req.body;

      const newInventory = new Inventory({ name, description });

      await newInventory.save();

      res.status(201).json(newInventory);
    } catch (error) {
      console.error("Erreur lors de la création de l'inventaire :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'inventaire." });
    }
  },

  // Route handler pour la récupération des détails d'un inventaire
  getInventoryDetails: async (req, res) => {
    try {
      const { inventoryId } = req.params;

      const inventory = await Inventory.findById(inventoryId).populate("items");

      if (!inventory) {
        return res
          .status(404)
          .json({ error: "L'inventaire spécifié n'existe pas." });
      }

      res.status(200).json(inventory);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'inventaire :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la récupération des détails de l'inventaire.",
      });
    }
  },

  // Route handler pour la mise à jour des détails d'un inventaire
  updateInventoryDetails: async (req, res) => {
    try {
      const { inventoryId } = req.params;
      const { name, description } = req.body;

      const updatedInventory = await Inventory.findByIdAndUpdate(
        inventoryId,
        { name, description },
        { new: true }
      );

      if (!updatedInventory) {
        return res
          .status(404)
          .json({ error: "L'inventaire spécifié n'existe pas." });
      }

      res.status(200).json(updatedInventory);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des détails de l'inventaire :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la mise à jour des détails de l'inventaire.",
      });
    }
  },

  // Route handler pour la récupération des articles d'un inventaire
  getInventoryItems: async (req, res) => {
    try {
      const { inventoryId } = req.params;

      const inventory = await Inventory.findById(inventoryId).populate("items");

      if (!inventory) {
        return res
          .status(404)
          .json({ error: "L'inventaire spécifié n'existe pas." });
      }

      res.status(200).json(inventory.items);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des articles de l'inventaire :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la récupération des articles de l'inventaire.",
      });
    }
  },

  // Route handler pour la création d'une commande d'inventaire
  createInventoryOrder: async (req, res) => {
    try {
      const { inventoryId } = req.params;
      const { items, institutionId } = req.body;

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
      console.error(
        "Erreur lors de la création de la commande d'inventaire :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de la création de la commande d'inventaire.",
      });
    }
  },
};

// Exporter le contrôleur des inventaires
module.exports = inventoriesController;
