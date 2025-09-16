const mongoose = require("mongoose");

const LivestockHandlerSchema = new mongoose.Schema({
  handler_id: {
    type: String,
    required: true,
    unique: true
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
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact_No: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Export model
module.exports = mongoose.model("LivestockHandler", LivestockHandlerSchema);
