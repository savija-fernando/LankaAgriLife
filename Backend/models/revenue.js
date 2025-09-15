const mongoose = require("mongoose");
const revenueSupervisor = require("./revenueSupervisor");

const revenueSchema = new mongoose.Schema({
  revenue_id: {
    type: String,
    required: true,
    unique: true
  },
  salesData: {
    type: Number,
    required: true
  },
  expenseData: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Revenue", revenueSchema);
