const router = require("express").Router();
const Compost = require("../models/Compost");

// ✅ Add compost
router.post("/add", async (req, res) => {
  const { compost_id, quantity, compostStatus, fermentingDate } = req.body;

  try {
    const newCompost = new Compost({
      compost_id,
      quantity: Number(quantity),
      compostStatus,
      fermentingDate: new Date(fermentingDate),
    });

    await newCompost.save();
    res.json("Compost item added!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error: " + error.message });
  }
});

// ✅ Get all compost records
router.get("/", async (req, res) => {
  try {
    const compost = await Compost.find();
    res.json(compost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update compost by compost_id (NOT _id)
router.put("/update/:id", async (req, res) => {
  const compostId = req.params.id; // like "CMP001"
  const { quantity, compostStatus, fermentingDate } = req.body;

  try {
    const updated = await Compost.findOneAndUpdate(
      { compost_id: compostId }, // 🔑 use compost_id here
      {
        quantity,
        compostStatus,
        fermentingDate: new Date(fermentingDate),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({ status: "Compost not found" });
    }

    res.status(200).send({ status: "Compost updated", compost: updated });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

// ✅ Delete compost by compost_id (NOT _id)
router.delete("/delete/:id", async (req, res) => {
  const compostId = req.params.id;

  try {
    const deleted = await Compost.findOneAndDelete({ compost_id: compostId });

    if (!deleted) {
      return res.status(404).send({ status: "Compost not found" });
    }

    res.status(200).send({ status: "Compost deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with delete compost", error: err.message });
  }
});

module.exports = router;
