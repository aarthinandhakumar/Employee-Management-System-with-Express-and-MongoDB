# Employee Management System

## Overview

This project involves creating an Employee Management System using Express and MongoDB. The application will enable adding, deleting, displaying, and editing employee data stored in a MongoDB database.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation Steps

1. Clone the Repository

2. Navigate to the Project Directory

3. Install Dependencies

   npm install    

4. **MongoDB Setup**

    - **Start MongoDB**: Ensure MongoDB is running on your local machine or on a server you have access to.

    - **Initialize the Database**: Run the following command to initialize the MongoDB database with sample employee data:

      node initDB.js

## File Structure

- `server.js` - Main server file configuring routes and initializing the server.
- `employeeDB.js` - Mongoose schema for the Employee model.
- `initDB.js` - Script to initialize the MongoDB database with sample data.
- `mongo_zipCodeModule_v2.js` - Module to interact with the MongoDB database.
- `client.js` - Client-side test code to verify module functionality.

### Running the Application

1. **Start the Express Server**
   
    node server.js

2. **Access the Application**: Open your web browser and navigate to (http://localhost:3000) to view the Employee Management System.


## Application Features

- **Home Page**: Displays a list of all employees with options to add, edit, or delete employees.
- **Add Employee**: Click the "Add" button to open the add employee form. Fill in the employee details and click "Submit". The new employee will be added to the database and the updated list will be displayed.
- **Edit Employee**: Click the "Edit" button next to an employee's name to open the edit form. Update the employee details and click "Save". The changes will be saved to the database and the updated list will be 
displayed.
- **Delete Employee**: Click the "Delete" button next to an employee's name to open the delete confirmation. Confirm the deletion to remove the employee from the database. The updated list of employees will be displayed.

## License
This project is licensed under the MIT License - see the [LICENSE](License.txt) file for details.
