const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController");
const { verifyAccessToken } = require("../middleware/authMiddleware");

// Route to register a new user
router.post("/addProject", verifyAccessToken, ProjectController.createProject);
router.get(
  "/getProjects",
  verifyAccessToken,
  ProjectController.getProjectsByUserId
);
router.post("/addStyle", verifyAccessToken, ProjectController.addStyle);

module.exports = router;
