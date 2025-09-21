const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
  waste_id: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Waste", wasteSchema);
