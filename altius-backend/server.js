// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS must be configured BEFORE any routes
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
const stallRoutes = require("./routes/stalls");
app.use("/api/stalls", stallRoutes);

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/altius")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
