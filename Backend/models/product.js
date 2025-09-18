const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        required: true,
        unique: true
    },

    storageDetails: {
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required: true
    },

    CollectionDate:{
        type: Date,
        required: true
    },

    processedStatus:{
        type: String,
        required: true
    },
    note:{
        type: String
    }

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
