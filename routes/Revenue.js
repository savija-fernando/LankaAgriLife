const express = require("express");
const router = express.Router();

const {
  addRevenue,         
  getAllRevenue,      
  updateRevenue,       
  deleteRevenue,       
  getRevenueReport,    
} = require("../controllers/RevenueController");

// POST /Revenue/add
router.post("/add", addRevenue);

// GET /Revenue
router.get("/", getAllRevenue);

// PUT /Revenue/update/:id
router.put("/update/:id", updateRevenue);

// DELETE /Revenue/delete/:id
router.delete("/delete/:id", deleteRevenue);

// GET /Revenue/report (JSON report)
router.get("/report", getRevenueReport);

// GET /Revenue/report/pdf (download PDF)
const { generateRevenuePDF } = require("../controllers/pdfController");
router.get("/report/pdf", generateRevenuePDF);

module.exports = router;
