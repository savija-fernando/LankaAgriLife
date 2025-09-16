const router = require("express").Router();
const Employee = require("../models/livestockHandler");

// ================================
// Add new employee
// ================================
router.route("/add").post((req, res) => {
  console.log("Request body:", req.body); // Debug

  const { handler_id, firstName, lastName,loginCredentials, email, contact_No} = req.body;

  const newLivestockHandler = new Employee({
    handler_id,
    firstName,
    lastName,
    loginCredentials,
    email,
    contact_No
      });

  newLivestockHandler.save()
    .then(() => res.json("New LivestockHandler added successfully!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json("Error: " + error.message);
    });
});

// ================================
// Get all employees
// ================================
router.route("/").get((req, res) => {
  LivestockHandler.find()
    .then((livestockHandler) => res.json(livestockHandler))
    .catch((error) => res.status(500).json("Error: " + error.message));
});

// ================================
// Update employee by employee_id
// ================================
router.route("/update/:handler_id").put(async (req, res) => {
  const handler_id = req.params.handler_id;
  const { firstName, lastName, email, contact, password } = req.body;

  try {
    const updated = await LivestockHandler.findOneAndUpdate(
      { handler_id },
      { firstName, lastName, email, contact, password },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "LivestockHandler not found" });
    }

    res.status(200).json({ message: "LivestockHandler updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating LivestockHandler", error: error.message });
  }
});

// ================================
// Delete employee by employee_id
// ================================
router.route("/delete/:handler_id").delete(async (req, res) => {
  const handler_id = req.params.handler_id;

  try {
    const deleted = await LivestockHandler.findOneAndDelete({ handler_id });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Employee", error: error.message });
  }
});

module.exports = router;