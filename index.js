const express = require("express");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/userroutes");
// Create an Express application
const app = express();
const cors = require("cors");
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

connectDB();
// Define a route to receive JSON data
app.use("/api/users", userRoutes);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
