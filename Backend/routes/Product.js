const router = require("express").Router();
const {error} = require("console");
const Employee = require("../models/product");
const {Router} = require("express");

router.route("/add").post((req, res) => {
  const product_id = req.body.product_id;
  const storageDetails = req.body.storageDetails;
  const type = req.body.type;
  const quantity = req.body.quantity;
  const CollectionDate = req.body.CollectionDate;
  const processedStatus = req.body.processedStatus;
  const note= req.body.note;

  const newProduct = new Product({
    product_id,
    storageDetails,
    type,
    quantity,
    CollectionDate,
    processedStatus,
    note
  });

  newProduct.save().then(() => {
    res.json("New Product added successfully!");
  })
    .catch((error) => {
      console.log(error);
      res.status(500).json("Error: " + error);
    });
});

//http://localhost:8070/Product
//get all data

router.route("/").get((req, res) => {
  Product.find().then((product) => {
    res.json(product)
  }).catch((error) => {
    console.log(error)
  })
});

//http://localhost:8070/Product/update/
router.route("/update/:id").put(async (req, res) => {
  //extract product id from url
  let productID = req.params.id;

  //destructure request
  const { product_id,storageDetails, type, quantity, CollectionDate, processedStatus, note } = req.body;

  //build update object
  const updateProduct = {
    product_id,
    storageDetails,
    type,
    quantity,
    CollectionDate,
    processedStatus,
    note
  }
  try {
    const updated = await Product.findOneAndUpdate(
      { product_id: productID  },
      updateProduct,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    else
    res.status(200).json({ message: "Product updated successfully", data: updated });

  } catch (error) {
    
    res.status(500).json({ message: "Error updating Product", error: error.message });
  }
});


router.route("/delete/:id").delete(async (req, res) => {
  const productID = req.params.id;

  try {
    const deletedItem = await Employee.findOneAndDelete({ product_id: productID });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Product", error: error.message });
  }
});

module.exports = router;