const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to register a new user
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshAccessToken);

module.exports = router;
