const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;
// Define the schema for the Employee collection
let Schema = mongoose.Schema;

let employeeSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true }
}, {
	collection: 'employees_Nandhakumar'
});
// Export an object with a getModel function to access the Employee model
module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("EmployeeModel", 
							employeeSchema);
		};
		return model;// Return the Employee model
	}
};