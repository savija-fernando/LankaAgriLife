const AdminDetails = require("../models/adminDetails");

// Add admin details
const addAdminDetails = async (req, res) => {
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;
  const role = req.body.role || "Admin";

  try {
    // Check for duplicate email
    const existingAdmin = await AdminDetails.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: `Admin with email ${email} already exists.` });
    }

    // Create new admin
    const newAdmin = new AdminDetails({
      email,
      passwordHash,
      role
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating admin", error });
  }
};

// Get all admin details
const getAllAdminDetails = async (req, res) => {
  try {
    const admins = await AdminDetails.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Update admin details
const updateAdminDetails = async (req, res) => {
  const adminId = req.params.id;
  const { email, passwordHash, role } = req.body;

  const updateAdmin = {
    email,
    passwordHash,
    role
  };

  try {
    const updatedAdmin = await AdminDetails.findOneAndUpdate(
      { _id: adminId },
      updateAdmin,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error: error.message });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const deletedAdmin = await AdminDetails.findOneAndDelete({ _id: adminId });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully", data: deletedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error: error.message });
  }
};

module.exports = {
  addAdminDetails,
  getAllAdminDetails,
  updateAdminDetails,
  deleteAdmin,
};