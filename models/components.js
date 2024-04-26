const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Style",
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Style",
  },
  radiusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Style",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["button", "selector", "radio"],
    required: true,
  },
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
