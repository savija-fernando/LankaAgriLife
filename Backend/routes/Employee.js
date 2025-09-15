const router = require("express").Router();
let Employee = require("../models/employee");

//CREATE
router.route("/add").post((req, res) => {
    const employee_id = req.body.employee_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contact = req.body.contact;
    const loginCredentials = {
        username: req.body.username,
        password: req.body.password
    };

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
            res.status(500).json("Error: " + error);
        });
});

//READ ALL
router.route("/get").get((req, res) => {
    Employee.find()
        .then((employees) => res.json(employees))
        .catch((error) => {
            console.error(error);
            res.status(500).json("Error fetching employees");
        });
});

//UPDATE
router.route("/update/:id").put(async (req, res) => {
    let empId = req.params.id;

    const { employee_id, firstName, lastName, email, contact, username, password } = req.body;

    const updateEmployee = {
        employee_id,
        firstName,
        lastName,
        email,
        contact,
        loginCredentials: { username, password }
    };

    try {
        const update = await Employee.findOneAndUpdate(
            { employee_id: empId }, // custom id field
            updateEmployee,
            { new: true }
        );

        if (!update) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", data: update });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
});

//DELETE
router.route("/delete/:id").delete(async (req, res) => {
    let empId = req.params.id;

    try {
        const deletedItem = await Employee.findOneAndDelete({ employee_id: empId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully", data: deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
});

module.exports = router;
