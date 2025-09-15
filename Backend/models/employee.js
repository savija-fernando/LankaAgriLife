const mongoose = require('mongoose');

const loginCredentialsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { _id: false }); // prevent creating a separate _id for this subdocument

const employeeSchema = new mongoose.Schema({
    employee_id: { type: String, 
        required: true, 
        unique: true },
    firstName: { type: String, 
        required: true },
    lastName: { type: String, 
        required: true },
    email: { type: String,
         required: true, 
         unique: true },
    contact: { type: String },
    loginCredentials: { type: loginCredentialsSchema,
         required: true } // ensure this object is required
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
