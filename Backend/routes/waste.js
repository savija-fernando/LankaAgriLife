const router = require("express").Router();
const Waste = require("../models/Waste"); // match the file exactly

// Add waste
router.post("/add", (req, res) => {
  const { waste_id, quantity, type, date } = req.body;

  const newWaste = new Waste({
    waste_id,
    quantity: Number(quantity),
    type,
    date: new Date(date)
  });

  newWaste.save()
    .then(() => res.json("Waste item added!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error: " + error.message });
    });
});

// Get all waste records
router.get("/", (req, res) => {
  Waste.find()
    .then((waste) => res.json(waste))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
});

// Update waste by ID
router.put("/update/:id", (req, res) => {
  const wasteId = req.params.id;
  const { waste_id, quantity, type, date } = req.body;

  const updateWaste = {
    waste_id,
    quantity: Number(quantity),
    type,
    date: new Date(date)
  };

  Waste.findByIdAndUpdate(wasteId, updateWaste, { new: true })
    .then((updated) => res.json({ status: "Waste updated", waste: updated }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// Delete waste by ID
router.delete("/delete/:id", (req, res) => {
  const wasteId = req.params.id;

  Waste.findByIdAndDelete(wasteId)
    .then(() => res.json({ status: "Waste deleted" }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
