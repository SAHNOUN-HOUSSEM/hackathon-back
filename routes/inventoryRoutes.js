const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventoriesController");

// Routes liées aux inventaires
router.post("/register", inventoryController.createInventory);
router.get("/:inventoryId", inventoryController.getInventoryDetails);
router.put("/:inventoryId", inventoryController.updateInventoryDetails);
router.get("/:inventoryId/items", inventoryController.getInventoryItems);
router.post("/:inventoryId/orders", inventoryController.createInventoryOrder);

module.exports = router;
