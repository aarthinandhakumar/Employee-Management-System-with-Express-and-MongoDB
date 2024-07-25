const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    // Create a new employee with data from the request body
    const newEmployee = new Employee({
        firstName: req.body.fname,
        lastName: req.body.lname
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Redirect to the list of employees or another appropriate route
    res.redirect('/employees');
};