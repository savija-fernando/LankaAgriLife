const mongoose=require('mongoose');

const adminDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Admin"
        
    }
});

// Create model
const AdminDetails = mongoose.model("AdminDetails", adminDetailsSchema);

module.exports = AdminDetails;
