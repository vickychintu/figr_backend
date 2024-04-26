const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token format

    if (!token) {
      return res.status(401).json({ error: "Access token not provided" });
    }

    const decoded = jwt.verify(token, "your_access_token_secret");
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid access token" });
  }
};
