const Project = require("../models/project");
const Style = require("../models/style");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Assuming user ID is available in req.user from the middleware
    const user_id = req.user.userId;

    const newProject = new Project({ name, description, user_id });
    await newProject.save();

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.user.userId; // Using req.user.userId from the middleware

    // Find all projects belonging to the user
    const projects = await Project.find({ user_id: userId });
    console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addStyle = async (req, res) => {
  try {
    const { type, projectId, name, value } = req.body;
    console.log(projectId);
    const newStyle = new Style({ type, projectId, name, value });
    await newStyle.save();
    res
      .status(201)
      .json({ message: "Style added successfully", style: newStyle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getStylesByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch styles for the specified projectId and categorize by type
    const styles = await Style.aggregate([
      { $match: { projectId: projectId } },
      {
        $group: {
          _id: "$type",
          styles: { $push: { _id: "$_id", name: "$name", value: "$value" } },
        },
      },
    ]);

    res.status(200).json(styles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
