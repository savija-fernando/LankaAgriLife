const Animal = require("../models/animal");

// ✅ Add animal
const addAnimal = async (req, res) => {
  const { animal_id, species, breedingDetails, feedingData, healthRecord, dateOfBirth } = req.body;

  try {
    // Check for duplicate animal_id
    const existingItem = await Animal.findOne({ animal_id });
    if (existingItem) {
      return res.status(409).json({ message: `Animal with ID ${animal_id} already exists.` });
    }

    // Create new animal
    const newAnimal = new Animal({
      animal_id,
      species,
      breedingDetails,
      feedingData: feedingData ? new Date(feedingData) : undefined,
      healthRecord,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    });

    await newAnimal.save();
    return res.status(201).json({ message: "✅ Animal added successfully!", data: newAnimal });
  } catch (error) {
    console.error("❌ Error adding animal:", error);
    return res.status(500).json({ message: "Error adding animal", error: error.message });
  }
};

// ✅ Get all animals
const getAllAnimal = async (req, res) => {
  try {
    const animalItems = await Animal.find();
    return res.status(200).json(animalItems);
  } catch (error) {
    console.error("❌ Error fetching animals:", error);
    return res.status(500).json({ message: "Error fetching animals", error: error.message });
  }
};

// ✅ Update animal (by animal_id)
const updateAnimal = async (req, res) => {
  const animalId = req.params.id;
  const { species, breedingDetails, feedingData, healthRecord, dateOfBirth } = req.body;

  const updateData = {
    ...(species && { species }),
    ...(breedingDetails && { breedingDetails }),
    ...(feedingData && { feedingData: new Date(feedingData) }),
    ...(healthRecord && { healthRecord }),
    ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
  };

  try {
    const updatedItem = await Animal.findOneAndUpdate(
      { animal_id: animalId }, // find by animal_id
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: `Animal with ID ${animalId} not found.` });
    }

    return res.status(200).json({ message: "✅ Animal updated successfully!", data: updatedItem });
  } catch (error) {
    console.error("❌ Error updating animal:", error);
    return res.status(500).json({ message: "Error updating animal", error: error.message });
  }
};

// ✅ Delete animal (by animal_id)
const deleteAnimalItem = async (req, res) => {
  const animalId = req.params.id;

  try {
    const deletedItem = await Animal.findOneAndDelete({ animal_id: animalId });

    if (!deletedItem) {
      return res.status(404).json({ message: `Animal with ID ${animalId} not found.` });
    }

    return res.status(200).json({ message: "✅ Animal deleted successfully!", data: deletedItem });
  } catch (error) {
    console.error("❌ Error deleting animal:", error);
    return res.status(500).json({ message: "Error deleting animal", error: error.message });
  }
};

module.exports = {
  addAnimal,
  getAllAnimal,
  updateAnimal,
  deleteAnimalItem,
};
