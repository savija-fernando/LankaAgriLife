const router = require("express").Router();
let compostHandler = require("../models/CompostHandler");

// Add CompostHandler
router.route("/add").post((req, res) => {
  const { CompostHandler_id, f_name, l_name, loginCredentials, email, contact_No } = req.body;

  const newcompostHandler = new compostHandler({
    CompostHandler_id,
    f_name,
    l_name,
    loginCredentials,
    email,
    contact_No: Number(contact_No)
  });

  newFarmer.save()
    .then(() => res.json("CompostHandler added successfully!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json("Error: " + error);
    });
});

// Get all CompostHandler
router.route("/").get((req, res) => {
  compostHandler.find()
    .then((CompostHandlers) => res.json(CompostHandlers))
    .catch((error) => res.status(500).json("Error: " + error));
});

// Update CompostHandler by CompostHandler_id
router.route("/update/:CompostHandler_id").put(async (req, res) => {
  const CompostHandlerId = req.params.farmer_id; // <-- use farmer_id
  const { f_name, l_name, loginCredentials, email, contact_No } = req.body;

  try {
    const updated = await compostHandlerompostHandler.findOneAndUpdate(
      { CompostHandler_id: CompostHandlerId },  // <-- match by farmer_id
      { f_name, l_name, loginCredentials, email, contact_No },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "CompostHandler not found" });
    }

    res.status(200).json({ message: "CompostHandler updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating CompostHandler", error: error.message });
  }
});

// Delete CompostHandler by CompostHandler_id
router.route("/delete/:CompostHandler_id").delete(async (req, res) => {
  const farmerId = req.params.CompostHandler_id;

  try {
    const deleted = await compostHandler.findOneAndDelete({ CompostHandler_id: CompostHandlerId });

    if (!deleted) {
      return res.status(404).json({ message: "CompostHandler not found" });
    }

    res.status(200).json({ message: "CompostHandler deleted successfully", data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting CompostHandler", error: error.message });
  }
});

module.exports = router;