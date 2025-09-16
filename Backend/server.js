const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8070;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routers
const PlantRouter = require("./routes/Plant");
const FarmerRouter = require("./routes/Farmer");
const HarvestRouter = require("./routes/Harvest");

app.use("/Plant", PlantRouter);
app.use("/Farmer", FarmerRouter);
app.use("/Harvest", HarvestRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
