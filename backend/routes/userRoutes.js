const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

// GET all users (admin only)
router.get("/", auth, isAdmin, userController.getAllUsers);

// GET user by ID (admin or self)
router.get("/:id", auth, userController.getUserById);

// POST create user (open or admin only)
router.post("/", auth, isAdmin, userController.createUser);

// PUT update user (admin or self)
router.put("/:id", auth, userController.updateUser);

// DELETE user (admin only)
router.delete("/:id", auth, isAdmin, userController.deleteUser);

module.exports = router;
