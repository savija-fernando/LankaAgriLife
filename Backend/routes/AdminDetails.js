const express = require("express");
const router = express.Router();
const {
  addAdminDetails,
  getAllAdminDetails,
  updateAdminDetails,
  deleteAdmin,
  loginAdmin,
} = require("../controllers/adminDetailsController");

// POST /Admin/add
router.post("/add", addAdminDetails);

// GET /Admin
router.get("/", getAllAdminDetails);

// PUT /Admin/update/:id
router.put("/update/:id", updateAdminDetails);

// DELETE /Admin/delete/:id
router.delete("/delete/:id", deleteAdmin);

// POST /Admin/login
router.post("/login", loginAdmin);


module.exports = router;
