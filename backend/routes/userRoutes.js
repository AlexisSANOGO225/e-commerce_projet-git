const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userController = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

// Inscription
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email déjà utilisé" });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Identifiants invalides" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Identifiants invalides" });
    const token = jwt.sign({ userId: user._id }, "votre_secret_jwt", {
      expiresIn: "1d",
    });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all users (admin only)
router.get("/", auth, isAdmin, userController.getAllUsers);

// GET user by ID (admin or self)
router.get("/:id", auth, userController.getUserById);

// POST create user (admin only)
router.post("/", auth, isAdmin, userController.createUser);

// PUT update user (admin or self)
router.put("/:id", auth, userController.updateUser);

// DELETE user (admin only)
router.delete("/:id", auth, isAdmin, userController.deleteUser);

module.exports = router;