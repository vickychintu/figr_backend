const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

    trim: true, // Removes whitespace from both ends of the string
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email field
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
});

// Create a User model from the userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;
