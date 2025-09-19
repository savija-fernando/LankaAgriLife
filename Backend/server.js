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
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const WasteRouter = require("./routes/waste");
app.use("/waste", WasteRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
