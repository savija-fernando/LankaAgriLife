const express = require("express");
const router = express.Router();
const {
  addAnimal,
  getAllAnimal,
  updateAnimal,
  deleteAnimalItem,
} = require("../controllers/animal");

// POST /Animal/add
router.post("/add", addAnimal);

// GET /Animal
router.get("/", getAllAnimal);

// PUT /Animal/update/:id
router.put("/update/:id", updateAnimal);

// DELETE /Animal/delete/:id
router.delete("/delete/:id", deleteAnimalItem);

module.exports = router;