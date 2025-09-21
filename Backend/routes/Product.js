const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProductItem,
} = require("../controllers/product");

// POST /Product/add
router.post("/add", addProduct);

// GET /Product
router.get("/", getAllProduct);

// PUT /Product/update/:id
router.put("/update/:id", updateProduct);

// DELETE /Product/delete/:id
router.delete("/delete/:id", deleteProductItem);

module.exports = router;