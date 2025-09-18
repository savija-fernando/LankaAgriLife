const express = require("express");
const router = express.Router();
const {
  addLivestock,
  getAllLivestock,
  updateLivestockItem,
  deleteLivestockItem,
} = require("../controllers/livestockController");

// POST /LivestockHandler/add
router.post("/add", addLivestock);

// GET /LivestockHandler
router.get("/", getAllLivestock);

// PUT /LivestockHandler/update/:id
router.put("/update/:id", updateLivestockItem);

// DELETE /LivestockHandler/delete/:id
router.delete("/delete/:id", deleteLivestockItem);

module.exports = router;