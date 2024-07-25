const EmployeeDB = require('./employeeDB.js');

const Employee = EmployeeDB.getModel();

(async() => {

	await Employee.deleteMany({});
    // Create new Employee instances
	let employee1 = new Employee({
		firstName:'John',lastName:'Smith'
	}); 

	let employee2 = new Employee({
		firstName:'Jane',lastName:'Smith'
	}); 

	let employee3 = new Employee({
		firstName:'John',lastName:'Doe'
	}); 

    // Save all new Employee instances to the database concurrently
	await Promise.all([
			employee1.save(), 
			employee2.save(), 
			employee3.save()
		]);

	let currentEmployees = await Employee.find({});

	console.log(currentEmployees);

	process.exit();


})();