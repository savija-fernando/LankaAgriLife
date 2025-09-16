const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    storageDetails: {
        type: String
    },
    type: {
        type: String
    },
    note: {
        type: String
    },
    collectionDate: {
        type: Date
    },
    quantity: {
        type: Number
    },
    processedStatus: {
        type: String, // can be "processed", "pending", etc.
        enum: ["processed", "pending", "rejected"], // optional restriction
        default: "pending"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
