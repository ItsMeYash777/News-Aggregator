const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
const newsRoutes = require("./routes/news");
app.use("/api/news", newsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to News Aggregator API");
});



// Connect to MongoDB


// Set port and start server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Optional: Basic error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
