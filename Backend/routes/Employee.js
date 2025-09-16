const router = require("express").Router();
const { error } = require("console");
const Employee = require("../models/employee"); 
const { Router} = require("express");

// CREATE - Add new employee
router.route("/add").post((req,res) => {
    const employee_id= req.body.employee_id;
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const  email= req.body.email;
    const  contact= req.body.contact; 
    const  loginCredentials= req.body.console.loginCredentials;


    const newEmployee = new Employee({
        employee_id,
        firstName,
        lastName,
        email,
        contact,
        loginCredentials
    });

    newEmployee.save()
        .then(() => res.json("Employee added!"))
        .catch((error) => {
            console.error(error);
            res.status(500).json("Error: " + error.message);
        });
};



module.exports = router;
