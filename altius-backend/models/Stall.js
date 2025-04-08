// backend/models/Stall.js
const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  number: Number,
  area: Number,
  price: Number,
  booked: {
    type: Boolean,
    default: false,
  },
  bookedBy: String,
  bookedByName: String,
});

module.exports = mongoose.model("Stall", stallSchema);
