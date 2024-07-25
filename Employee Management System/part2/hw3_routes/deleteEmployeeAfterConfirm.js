const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    // Find and delete the employee by ID
    await Employee.findByIdAndRemove(req.params.id);

    // Redirect to the list of employees
    res.redirect('/employees');
};