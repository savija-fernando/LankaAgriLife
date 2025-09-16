const mongoose = require("mongoose");

const LivestockHandlerSchema = new mongoose.Schema({
  handler_id: {
    type: String,
    required: true,
    unique: true // assuming liceStock_id should be unique
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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

// Export LivestockHandler model
const Farmer = mongoose.model("LivestockHandler", Schema);
module.exports = LivestockHandler;