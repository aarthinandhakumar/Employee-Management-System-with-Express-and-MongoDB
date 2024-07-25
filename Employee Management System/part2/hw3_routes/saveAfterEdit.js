const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    // Find the employee document by its ID from the request parameters
    const employee = await Employee.findById(req.params.id);
   // Update the employee's first name and last name with the values from the request body
    employee.firstName = req.body.fname;
    employee.lastName = req.body.lname;
    // Save the updated employee document to the database
    await employee.save();
   //Redirect the user to the '/employees' page after successful update
    res.redirect('/employees');
};