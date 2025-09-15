const router = require("express").Router();
const Employee = require("../models/employee"); // adjust path if needed

// CREATE - Add new employee
router.post("/add", (req, res) => {
    const { employee_id, firstName, lastName, email, contact, loginCredentials } = req.body;

    // Validate loginCredentials object
    if (!loginCredentials || !loginCredentials.username || !loginCredentials.password) {
        return res.status(400).json({ message: "loginCredentials with username and password is required" });
    }

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
});

// READ ALL - Get all employees
router.get("/get", (req, res) => {
    Employee.find()
        .then((employees) => res.json(employees))
        .catch((error) => {
            console.error(error);
            res.status(500).json("Error fetching employees: " + error.message);
        });
});

// UPDATE - Update employee by employee_id
router.put("/update/:id", async (req, res) => {
    const empId = req.params.id;
    const { employee_id, firstName, lastName, email, contact, loginCredentials } = req.body;

    if (!loginCredentials || !loginCredentials.username || !loginCredentials.password) {
        return res.status(400).json({ message: "loginCredentials with username and password is required" });
    }

    const updateEmployee = {
        employee_id,
        firstName,
        lastName,
        email,
        contact,
        loginCredentials
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

// DELETE - Delete employee by employee_id
router.delete("/delete/:id", async (req, res) => {
    const empId = req.params.id;

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
