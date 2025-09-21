// controllers/RevenueController.js
const Revenue = require("../models/revenue");

// Add revenue item
const addRevenue = async (req, res) => {
  //getting the the values using request
  const revenue_id  = req.body.revenue_id;
  const salesData   = Number(req.body.salesData);
  const expenseData = Number(req.body.expenseData);
  const profit      = Number(req.body.profit);

  try {
    //  Check for duplicate revenue_id
    const existingItem = await Revenue.findOne({ revenue_id });

    if (existingItem) {
      return res
        .status(409)
        .json({ message: `Revenue item with ID ${revenue_id} already exists.` });
    }

    //sending data to database or create objects from schema
    const newRevenue = new Revenue({
      revenue_id,
      salesData,
      expenseData,
      profit,
    });

    await newRevenue.save();
    res.json("Revenue item added!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Get all revenue items
const getAllRevenue = async (req, res) => {
  try {
    const revenues = await Revenue.find();
    res.json(revenues);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Update revenue item
const updateRevenue = async (req, res) => {
  const revenueId = req.params.id;
  const { revenue_id, salesData, expenseData, profit } = req.body;

  const updateRevenueDoc = {
    revenue_id,
    salesData,
    expenseData,
    profit,
  };

  try {
    const updatedItem = await Revenue.findOneAndUpdate(
      { revenue_id: revenueId },
      updateRevenueDoc,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Revenue item not found" });
    }

    res
      .status(200)
      .json({ message: "Revenue updated successfully", data: updatedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Revenue", error: error.message });
  }
};

// Delete revenue item
const deleteRevenue = async (req, res) => {
  const revenueId = req.params.id;

  try {
    const deletedItem = await Revenue.findOneAndDelete({ revenue_id: revenueId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Revenue item not found" });
    }

    res
      .status(200)
      .json({ message: "Revenue item deleted successfully", data: deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Revenue item", error: error.message });
  }
};

module.exports = {
  addRevenue,
  getAllRevenue,
  updateRevenue,
  deleteRevenue,
};
