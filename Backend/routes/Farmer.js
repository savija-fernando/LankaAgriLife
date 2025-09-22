const router = require("express").Router();
let Farmer = require("../models/farmer");

// Add farmer
router.route("/add").post((req, res) => {
  const { farmer_id, f_name, l_name, loginCredentials, email, contact_No } = req.body;

  const newFarmer = new Farmer({
    farmer_id,
    f_name,
    l_name,
    loginCredentials,
    email,
    contact_No: Number(contact_No)
  });

  newFarmer.save()
    .then(() => res.json("Farmer added successfully!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json("Error: " + error);
    });
});

// Get all farmers
router.route("/").get((req, res) => {
  Farmer.find()
    .then((farmers) => res.json(farmers))
    .catch((error) => res.status(500).json("Error: " + error));
});

// Update farmer by farmer_id
router.route("/update/:farmer_id").put(async (req, res) => {
  const farmerId = req.params.farmer_id; // <-- use farmer_id
  const { f_name, l_name, loginCredentials, email, contact_No } = req.body;

  try {
    const updated = await Farmer.findOneAndUpdate(
      { farmer_id: farmerId },  // <-- match by farmer_id
      { f_name, l_name, loginCredentials, email, contact_No },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating farmer", error: error.message });
  }
});

// Delete farmer by farmer_id
router.route("/delete/:farmer_id").delete(async (req, res) => {
  const farmerId = req.params.farmer_id;

  try {
    const deleted = await Farmer.findOneAndDelete({ farmer_id: farmerId });

    if (!deleted) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer deleted successfully", data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting farmer", error: error.message });
  }
});

module.exports = router;
