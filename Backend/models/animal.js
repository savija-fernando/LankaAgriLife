const mongoose = require('mongoose');

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
        type: String
    },
    feedingData: {
        type: String
    },
    healthRecord: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
   
}, {
    timestamps: true
});

module.exports=mongoose.model("Animal", animalSchema);
