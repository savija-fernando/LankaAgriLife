const mongoose = require('mongoose');

const revenueSupervisorSchema = new mongoose.Schema({
    rsupervisor_id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    
    contact: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports  = mongoose.model("RevenueSupervisor", revenueSupervisorSchema);
