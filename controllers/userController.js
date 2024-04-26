// controllers/userController.js

const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email);
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      "your_access_token_secret",
      { expiresIn: "7d" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      "your_refresh_token_secret",
      { expiresIn: "7d" }
    );

    // Store refresh token securely on the client side (e.g., in an HTTP-only cookie)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token
    const decodedToken = jwt.verify(refreshToken, "your_refresh_token_secret");

    // If the refresh token is valid, issue a new access token
    const accessToken = jwt.sign(
      { userId: decodedToken.userId },
      "your_access_token_secret",
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
