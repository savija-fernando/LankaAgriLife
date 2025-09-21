const router = require("express").Router();
const CompostHandler = require("../models/CompostHandler");

// Add CompostHandler
router.route("/add").post((req, res) => {
  const { CompostHandler_id, f_name, l_name, loginCredentials, email, contact_No } = req.body;

  const newCompostHandler = new CompostHandler({
    CompostHandler_id,
    f_name,
    l_name,
    loginCredentials,
    email,
    contact_No: Number(contact_No)
  });

  newCompostHandler
    .save()
    .then(() => res.json("CompostHandler added successfully!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json("Error: " + error.message);
    });
});

// Get all CompostHandlers
router.route("/").get((req, res) => {
  CompostHandler.find()
    .then((compostHandlers) => res.json(compostHandlers))
    .catch((error) => res.status(500).json("Error: " + error.message));
});

// Update CompostHandler by CompostHandler_id
router.route("/update/:CompostHandler_id").put(async (req, res) => {
  const CompostHandlerId = req.params.CompostHandler_id;
  const { f_name, l_name, loginCredentials, email, contact_No } = req.body;

  try {
    const updated = await CompostHandler.findOneAndUpdate(
      { CompostHandler_id: CompostHandlerId },
      { f_name, l_name, loginCredentials, email, contact_No: Number(contact_No) },
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
  const CompostHandlerId = req.params.CompostHandler_id;

  try {
    const deleted = await CompostHandler.findOneAndDelete({ CompostHandler_id: CompostHandlerId });

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
