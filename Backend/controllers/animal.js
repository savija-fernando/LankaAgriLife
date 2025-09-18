const animal = require("../models/animal");

// Add animal
const addAnimal = async (req, res) => {
  //getting the the values using request
    const animal_id=req.body.animal_id;
    const species=req.body.species;
    const breedingDetails=req.body.breedingDetails;
    const feedingData=new Date(req.body.feedingData);
    const healthRecord=req.body.healthRecord;
    const dateOfBirth=new Date(req.body.dateOfBirth);

     try {
    //  Check for duplicate animal_id
    const existingItem = await Animal.findOne({ animal_id });

    if (existingItem) {
      return res.status(409).json({ message: `Animal with ID ${animal_id} already exists.` });
    }

    //sending data to database or create objects from schema
    const newAnimal= new Animal({
        animal_id,
        species,
        breedingDetails,
        feedingData,
        healthRecord,
        dateOfBirth
    });

    await newAnimal.save();
    res.json("Animal added!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Get all animal items
const getAllAnimal = async (req, res) => {
  try {
    const animalItems = await animal.find();
    res.json(animalItems);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Update animal item
const updateAnimal = async (req, res) => {
  const animalId = req.params.id;
  const { species, breedingDetails, feedingData, healthRecord, dateOfBirth } = req.body;

  const updateAnimal = {
    animal_id,
        species,
        breedingDetails,
        feedingData,
        healthRecord,
        dateOfBirth
  };

  try {
    const updatedItem = await animal.findOneAndUpdate(
      { animal_id: animalId },
      updateAnimal,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Animal item not found" });
    }

    res.status(200).json({ message: "Animal updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating animal", error: error.message });
  }
};

// Delete animal item
const deleteAnimalItem = async (req, res) => {
  const animalId = req.params.id;

  try {
    const deletedItem = await animal.findOneAndDelete({ animal_id: animalId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Animal item not found" });
    }

    res.status(200).json({ message: "Animal item deleted successfully", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal item", error: error.message });
  }
};

module.exports = {
  addAnimal,
  getAllAnimal,
  updateAnimal,
  deleteAnimalItem,
};