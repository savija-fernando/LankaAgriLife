const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");    // for loading environment variables
const twilio = require("twilio");

dotenv.config();  // load .env file

const app = express();
const PORT = process.env.PORT || 8070;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
    .then(() => console.log("MongoDB Connection success!"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// WhatsApp route
app.post("/send-message", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const msg = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,  
            to: process.env.YOUR_WHATSAPP_NUMBER,      // my WhatsApp number
            body: `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        res.status(200).json({ success: true, sid: msg.sid });
    } catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//Inventory route
const InventoryRouter = require("./routes/Inventory");
app.use("/Inventory", InventoryRouter);

//AdminDetails route
const AdminDetailsRouter = require("./routes/AdminDetails");
app.use("/AdminDetails", AdminDetailsRouter);

//Revenue route
const RevenueRouter=require("./routes/Revenue");
app.use("/Revenue",RevenueRouter);

//Animal route
const AnimalRouter = require("./routes/Animal");
app.use("/Animal", AnimalRouter);

//Livestock route
const LivestockRouter = require("./routes/LivestockHandler");
app.use("/LivestockHandler", LivestockRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
