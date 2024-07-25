const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

// display employees

module.exports = async (req , res , next) => {
        // Retrieve all employee documents from the database
        let employees = await Employee.find({});
        // Transform the list of employee documents into a simpler format
        let results = employees.map( emp => {
            return {
                id: emp._id,
                firstName: emp.firstName,
                lastName: emp.lastName
            }
        });
            // Render the 'displayEmployeesView' template with the list of employees and title
        res.render('displayEmployeesView',
                {title:"List of Employees", data:results});
        
};