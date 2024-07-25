const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);
    
    res.render('editEmployeeView', { 
        employee: {// Pass the employee data to the view, including ID, first name, and last name
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName
        },
        title: 'Edit an Employee' // Set the page title for the view
    });
};