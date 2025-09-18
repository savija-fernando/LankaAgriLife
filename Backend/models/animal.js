const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  animal_id: {
    type: String,
    required: true,
    unique: true
  },
  species: {
    type: String,
    required: true
  },
  breedingDetails: {
    type: String,
    required: true
  },
  feedingData: {
    type: Date
  },
  healthRecord: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date
  }
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;