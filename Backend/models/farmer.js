const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  farmer_id: {
    type: String,
    required: true,
    unique: true // assuming farmer_id should be unique
  },
  f_name: {
    type: String,
    required: true
  },
  l_name: {
    type: String,
    required: true
  },
  loginCredentials: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact_No: {
    type: Number,
    required: true
  }
});

// Export Farmer model
const Farmer = mongoose.model("Farmer", FarmerSchema);
module.exports = Farmer;
