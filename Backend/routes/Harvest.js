const router = require("express").Router();
let Harvest = require("../models/harvest"); // import Harvest model

// Add a new harvest
router.route("/add").post((req, res) => {
    const harvest_id = req.body.harvest_id;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const harvestDate = new Date(req.body.harvestDate);
    const note = req.body.note;

    const newHarvest = new Harvest({
        harvest_id,
        type,
        quantity,
        harvestDate,
        note
    });

    newHarvest.save()
        .then(() => res.json("Harvest is added!"))
        .catch((error) => {
            console.log(error);
            res.status(500).json("Error: " + error);
        });
});

// Get all harvests
router.route("/").get((req, res) => {
    Harvest.find()
        .then((harvests) => res.json(harvests)) // fixed variable name
        .catch((error) => {
            console.log(error);
            res.status(500).json("Error: " + error);
        });
});

// Update harvest by harvest_id
router.route("/update/:id").put(async (req, res) => {
    const harvestId = req.params.id;
    const { harvest_id, type, quantity, harvestDate, note } = req.body;

    const updateHarvest = { harvest_id, type, quantity, harvestDate, note };

    try {
        const update = await Harvest.findOneAndUpdate(
            { harvest_id: harvestId },
            updateHarvest,
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: "Harvest not found" });
        }
        res.status(200).json({ message: "Harvest updated successfully", data: update });
    } catch (error) {
        res.status(500).json({ message: "Error updating harvest", error: error.message });
    }
});

// Delete harvest by harvest_id
router.route("/delete/:id").delete(async (req, res) => {
    const harvestId = req.params.id;

    try {
        const deletedItem = await Harvest.findOneAndDelete({ harvest_id: harvestId });
        if (!deletedItem) {
            return res.status(404).json({ message: "Harvest not found" });
        }
        res.status(200).json({ message: "Harvest deleted successfully", data: deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Error deleting harvest", error: error.message });
    }
});

module.exports = router;
