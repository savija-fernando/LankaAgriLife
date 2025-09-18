const livestock = require("../models/livestockHandler");

// Add livestock 
const addLivestock = async (req, res) => {
  //getting the the values using request
    const handler_id=req.body.handler_id;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const password=req.body.password;
    const email=req.body.email;
    const contact_No=req.body.contact_No;

    try {
    //  Check for duplicate handler_id
    const existingItem = await livestock.findOne({ handler_id });

    if (existingItem) {
      return res.status(409).json({ message: `Livestock with ID ${handler_id} already exists.` });
    }

    //sending data to database or create objects from schema
    const newLivestock= new livestock({
        handler_id,
        firstName,
        lastName,
        password,
        email,
        contact_No
    });

    await newLivestock.save();
    res.json("Livestock item added!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Get all livestock items
const getAllLivestock = async (req, res) => {
  try {
    const livestockItems = await livestock.find();
    res.json(livestockItems);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Update livestock item
const updateLivestockItem = async (req, res) => {
  const livestockId = req.params.id;
  const { handler_id, firstName, lastName, password, email, contact_No } = req.body;

  const updateLivestock = {
    handler_id,
    firstName,
    lastName,
    password,
    email,
    contact_No
  };

  try {
    const updatedItem = await livestock.findOneAndUpdate(
      { handler_id: livestockId },
      updateLivestock,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Livestock item not found" });
    }

    res.status(200).json({ message: "Livestock updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating livestock", error: error.message });
  }
};


// Delete livestock item
const deleteLivestockItem = async (req, res) => {
  const livestockId = req.params.id;

  try {
    const deletedItem = await livestock.findOneAndDelete({ handler_id: livestockId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Livestock item not found" });
    }

    res.status(200).json({ message: "Livestock item deleted successfully", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting livestock item", error: error.message });
  }
};

module.exports = {
  addLivestock,
  getAllLivestock,
  updateLivestockItem,
  deleteLivestockItem,
};