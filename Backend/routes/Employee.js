const router = require("express").Router();
const {error} = require("console");
const Employee = require("../models/employee");
const {Router} = require("express");

router.route("/add").post((req, res) => {
  const employee_id = req.body.employee_id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const contact = req.body.contact;
  const password = req.body.password;

  const newEmployee = new Employee({
    employee_id,
    firstName,
    lastName,
    email,
    contact,
    password
  });

  newEmployee.save().then(() => {
    res.json("New Employee added successfully!");
  })
    .catch((error) => {
      console.log(error);
      res.status(500).json("Error: " + error);
    });
});

//http://localhost:8070/Employee
//get all data

router.route("/").get((req, res) => {
  Employee.find().then((employees) => {
    res.json(employees)
  }).catch((error) => {
    console.log(error)
  })
});

//http://localhost:8070/Employee/update/
router.route("/update/:id").put(async (req, res) => {
  //extract employee id from url
  let employeeID = req.params.id;

  //destructure request
  const { employee_id,firstName, lastName, email, contact, password } = req.body;

  //build update object
  const updateEmployee = {
    employee_id,
    firstName,
    lastName,
    email,
    contact,
    password

  }
  try {
    const updated = await Employee.findOneAndUpdate(
      { employee_id: employeeID },
      updateEmployee,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    else
    res.status(200).json({ message: "Employee updated successfully", data: updated });

  } catch (error) {
    
    res.status(500).json({ message: "Error updating Employee", error: error.message });
  }
});


router.route("/delete/:id").delete(async (req, res) => {
  const employeeID = req.params.id;

  try {
    const deletedItem = await Employee.findOneAndDelete({ employee_id: employeeID });

    if (!deletedItem) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Employee", error: error.message });
  }
});

module.exports = router;