const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employee_id:{
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    contact:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

}, {timestamps:true});

module.exports = mongoose.model("Employee", employeeSchema);