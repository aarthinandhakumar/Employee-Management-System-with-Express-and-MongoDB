const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    // Find the employee document by its ID from the request parameters
    const employee = await Employee.findById(req.params.id);
    res.render('deleteEmployeeView', { 
        employee: {// Pass the employee data to the view, including ID, first name, and last name
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName
        },
        title: 'Delete Employee?'// Set the title for the view
    });
};