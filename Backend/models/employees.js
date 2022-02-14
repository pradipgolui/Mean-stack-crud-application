// Defining Employee Model for employee collection In Database
// Importing dependencies for mongoose libraries
const mongoose = require('mongoose');

// Defining the employee model for mongoDB collection
var Employee = mongoose.model('Employee', {
    empId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    salary: { 
        type: Number,
        required: true
    }
});

module.exports = { Employee };