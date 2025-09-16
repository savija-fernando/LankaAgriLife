const router = require("express").Router();
let Product = require("../models/product"); // Import Product model

// CREATE (Add product)
router.route("/add").post((req, res) => {
    const product_id = req.body.product_id;
    const storageDetails = req.body.storageDetails;
    const type = req.body.type;
    const note = req.body.note;
    const collectionDate = new Date(req.body.collectionDate);
    const quantity = req.body.quantity;
    const processedStatus = req.body.processedStatus;

    const newProduct = new Product({
        product_id,
        storageDetails,
        type,
        note,
        collectionDate,
        quantity,
        processedStatus
    });

    newProduct.save().then(() => {
        res.json("Product added!");
    }).catch((error) => {
        console.log(error);
        res.status(500).json("Error: " + error);
    });
});

// READ (Get all products)
router.route("/get").get((req, res) => {
    Product.find().then((products) => {
        res.json(products);
    }).catch((error) => {
        console.log(error);
        res.status(500).json("Error: " + error);
    });
});

// UPDATE (Update product by product_id)
router.route("/update/:id").put(async (req, res) => {
    let productId = req.params.id;

    const { product_id, storageDetails, type, note, collectionDate, quantity, processedStatus } = req.body;

    const updateProduct = {
        product_id,
        storageDetails,
        type,
        note,
        collectionDate,
        quantity,
        processedStatus
    };

    try {
        const update = await Product.findOneAndUpdate(
            { product_id: productId },
            updateProduct,
            { new: true }
        );

        if (!update) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", data: update });
    } catch (error) {
        res.status(500).json({ message: "Error updating Product", error: error.message });
    }
});

// DELETE (Delete product by product_id)
router.route("/delete/:id").delete(async (req, res) => {
    let productId = req.params.id;

    try {
        const deletedItem = await Product.findOneAndDelete({ product_id: productId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", data: deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Product", error: error.message });
    }
});

module.exports = router;
