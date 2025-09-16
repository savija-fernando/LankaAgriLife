const mongoose = require("mongoose");
const { applyTimestamps } = require("./employee");

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
  password: {
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
}, {timestamps:true});

module.exports = mongoose.model("LivestockHandler", LivestockHandlerSchemaivestockHandlerSchema);
 