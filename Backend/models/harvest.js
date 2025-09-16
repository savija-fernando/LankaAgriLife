const mongoose = require('mongoose');

const harvestSchema = new mongoose.Schema({
  harvest_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Harvest",harvestSchema);