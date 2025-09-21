const mongoose = require("mongoose");

const compostSchema = new mongoose.Schema({
  compost_id: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  compostStatus: {
    type: String,
    enum: ["fermenting", "ready", "used", "discarded"], // you can customize statuses
    required: true
  },
  fermentingDate: {
    type: Date,
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Compost", compostSchema);