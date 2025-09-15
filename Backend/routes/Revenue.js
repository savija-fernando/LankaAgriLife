const express = require("express");
const router = express.Router();

const {
  addRevenue,         
  getAllRevenue,      
  updateRevenue,       
  deleteRevenue,       
} = require("../controllers/RevenueController");

// POST /Revenue/add
router.post("/add", addRevenue);

// GET /Revenue
router.get("/", getAllRevenue);

// PUT /Revenue/update/:id
router.put("/update/:id", updateRevenue);

// DELETE /Revenue/delete/:id
router.delete("/delete/:id", deleteRevenue);

//GET/Revenue/report
const genaratePDF = require("../controllers/pdfController");
router.get("/report", genaratePDF);
module.exports = router;
