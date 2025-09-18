const Product = require("../models/product");

// Add product
const addProduct = async (req, res) => {
  //getting the the values using request
    const product_id=req.body.product_id;
    const storageDetails=req.body.storageDetails;
    const type=req.body.type;
    const quantity=req.body.quantity;
    const CollectionDate=new Date(req.body.CollectionDate);
    const processedStatus=req.body.processedStatus;

      try {
    //  Check for duplicate product_id
    const existingItem = await Product.findOne({ product_id });

    if (existingItem) {
      return res.status(409).json({ message: `Product with ID ${product_id} already exists.` });
    }

    //sending data to database or create objects from schema
    const newProduct= new Product({
        product_id,
        storageDetails,
        type,
        quantity,
        CollectionDate,
        processedStatus
    });
     await newProduct.save();
    res.json("Product added!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};

// Get all product items
const getAllProduct = async (req, res) => {
  try {
    const productItems = await Product.find();
    res.json(productItems);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error: " + error);
  }
};
// Update an product item
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { storageDetails, type, quantity, CollectionDate, processedStatus } = req.body;

  const updateProduct = {
    product_id,
    storageDetails,
    type,
    quantity,
    CollectionDate,
    processedStatus
  };
  try {
      const updatedItem = await Product.findOneAndUpdate(
        { product_id: productId },
        updateProduct,
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Product item not found" });
      }

      res.status(200).json({ message: "Product updated successfully", data: updatedItem });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error: error.message });
    }
  };
// Delete product item
const deleteProductItem = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedItem = await Product.findOneAndDelete({ product_id: productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product item not found" });
    }

    res.status(200).json({ message: "Product item deleted successfully", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product item", error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProductItem,
};