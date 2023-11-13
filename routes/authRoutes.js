const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Routes liées à l'authentification
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/user", authController.getUserInfo);

module.exports = router;
