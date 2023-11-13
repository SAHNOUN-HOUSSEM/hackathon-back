// Import des modules nécessaires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const authController = {
  // Route handler pour l'enregistrement des utilisateurs
  registerUser: async (req, res) => {
    try {
      // Vérifier les erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Récupérer les données du corps de la requête
      const { username, password, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      let existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const newUser = new User({ username, password: hashedPassword, role });

      // Sauvegarder l'utilisateur dans la base de données
      await newUser.save();

      // Générer un token d'authentification
      const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, role: newUser.role },
        "votre_secret_key",
        { expiresIn: "1h" }
      );

      // Répondre avec le token et les informations de l'utilisateur
      res.status(201).json({
        token,
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
      });
    } catch (error) {
      // Gérer les erreurs
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur lors de l'enregistrement de l'utilisateur." });
    }
  },

  // Route handler pour l'authentification des utilisateurs
  loginUser: async (req, res) => {
    try {
      // Vérifier les erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Récupérer les données du corps de la requête
      const { username, password } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ error: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Vérifier le mot de passe
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ error: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Générer un token d'authentification
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        "votre_secret_key",
        { expiresIn: "1h" }
      );

      // Répondre avec le token et les informations de l'utilisateur
      res.status(200).json({
        token,
        userId: user._id,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      // Gérer les erreurs
      console.error(
        "Erreur lors de l'authentification de l'utilisateur :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur lors de l'authentification de l'utilisateur." });
    }
  },

  // Route handler pour obtenir les informations de l'utilisateur actuel
  getUserInfo: async (req, res) => {
    try {
      // Récupérer les informations de l'utilisateur à partir du token
      const { userId, username, role } = req.userData;

      // Répondre avec les informations de l'utilisateur
      res.status(200).json({ userId, username, role });
    } catch (error) {
      // Gérer les erreurs
      console.error(
        "Erreur lors de l'obtention des informations de l'utilisateur :",
        error
      );
      res.status(500).json({
        error: "Erreur lors de l'obtention des informations de l'utilisateur.",
      });
    }
  },
};

// Exporter le contrôleur d'authentification
module.exports = authController;
