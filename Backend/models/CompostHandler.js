const mongoose = require("mongoose");

const compostHandlerSchema = new mongoose.Schema({
  CompostHandler_id: {
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
const compostHandler = mongoose.model("compostHandler", compostHandlerSchema);
module.exports = compostHandler;