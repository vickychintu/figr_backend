const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["color", "radius", "space"],
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Style = mongoose.model("Style", styleSchema);

module.exports = Style;
