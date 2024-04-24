const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.js");
const connectDB = async () => {
  try {
    // MongoDB Atlas connection URI string
    const uri = MONGO_URI;

    // Connect to MongoDB Atlas
    await mongoose.connect(uri);

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
