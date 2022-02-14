/* *****************************************************************
   *****************************************************************
   **                                                             **
   **-------------------------------------------------------------**
   **-------------------------------------------------------------**
   **  Name       : CRUD Application                              **
   **  Company    : Gventure Technology Private Limited           **
   **  Devloper   : Pradip Golui                                  **
   **  Techs used : MongoDB, ExpressJS, AngularJS & NodeJS        **
   **  Date       : 27-01-2022                                    **
   **-------------------------------------------------------------**
   **-------------------------------------------------------------**
   **                                                             **
   *****************************************************************
   *****************************************************************
*/

// Server configuration for Node server using express libraries
// Importing dependencies from node_modules directory
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeController = require('./controllers/employeeController.js');

// MongoDB Connection 
const { mongoose } = require('./db.js');

// Create PORT for local machine
const PORT = process.env.PORT || 5001;

// Initialize the express in app variable
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Route access here
app.use('/employees', employeeController);

// PORT is listening in localhost
app.listen(PORT, () => console.log(`Server running at localhost ${PORT}`));