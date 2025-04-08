// backend/routes/stalls.js

const express = require("express");
const router = express.Router();
const Stall = require("../models/Stall");

// Get all stalls
router.get("/", async (req, res) => {
    try {
      const stalls = await Stall.find({});
      console.log("Fetched stalls:", stalls); // 🔍 ADD THIS LINE
      res.json(stalls);
    } catch (err) {
      console.error("Error fetching stalls:", err);
      res.status(500).json({ message: err.message });
    }
  });

// Get a single stall by ID
router.get("/:id", async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.id);
    if (!stall) return res.status(404).json({ message: "Stall not found" });
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a stall
router.post("/book", async (req, res) => {
  const { stallId, userEmail, userName } = req.body;
  try {
    const stall = await Stall.findById(stallId);
    if (!stall) return res.status(404).json({ message: "Stall not found" });

    if (stall.booked) {
      return res.status(400).json({ message: "Stall already booked" });
    }

    stall.booked = true;
    stall.bookedBy = userEmail;
    stall.bookedByName = userName;
    await stall.save();

    res.status(200).json({ message: "Stall booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error booking stall" });
  }
});

module.exports = router;
