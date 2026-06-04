const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Debug .env
console.log("Mongo URI:", process.env.MONGO_URI);

// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 TaskPlanet API Running");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});