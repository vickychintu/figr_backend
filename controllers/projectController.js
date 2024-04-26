const { Mongoose, default: mongoose } = require("mongoose");
const Project = require("../models/project");
const Style = require("../models/style");
const Component = require("../models/components");

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
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addStyle = async (req, res) => {
  try {
    const { type, projectId, name, value } = req.body;
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
    const { projectId } = req.body;
    console.log(projectId);
    // Fetch styles for the specified projectId and categorize by type
    const styles = await Style.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      {
        $group: {
          _id: "$type",
          styles: { $push: { _id: "$_id", name: "$name", value: "$value" } },
        },
      },
    ]);
    console.log(styles);
    res.status(200).json(styles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addComponent = async (req, res) => {
  try {
    const { projectId, colorId, spaceId, radiusId, name, type } = req.body;

    // Create a new Component instance
    const newComponent = new Component({
      projectId,
      colorId,
      spaceId,
      radiusId,
      name,
      type,
    });

    // Save the new component to the database
    const savedComponent = await newComponent.save();

    res.status(201).json(savedComponent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add component" });
  }
};
exports.getComponentsByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch components by project ID and populate style fields
    const components = await Component.find({ projectId })
      .populate("colorId")
      .populate("spaceId")
      .populate("radiusId");

    // Group components by type
    const groupedComponents = components.reduce((acc, component) => {
      acc[component.type] = acc[component.type] || [];
      acc[component.type].push({
        ...component._doc,
        colorValue: component.colorId.value,
        spaceValue: component.spaceId.value,
        radiusValue: component.radiusId.value,
      });
      return acc;
    }, {});

    res.status(200).json(groupedComponents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch components" });
  }
};
