/* *****************************************************************
   *****************************************************************
   **                                                             **
   **-------------------------------------------------------------**
   **-------------------------------------------------------------**
   **                                                             **
   **         Name : CRUD Application                             **
   **         Desc : Creating CREATE, READ, UPDATE & DELETE API   **
   **                                                             **
   **                                                             **
   **-------------------------------------------------------------**
   **-------------------------------------------------------------**
   **                                                             **
   *****************************************************************
   *****************************************************************
*/

// Importing dependencies from package.json file
const express = require('express');
const router = express.Router();
var { Employee } = require('../models/employees');
var ObjectId = require('mongoose').Types.ObjectId;

// CREATE API for add a employee 
router.post('/', (req, res) => {
    var emp = new Employee({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Save:', +JSON.stringify(err, undefined, 2));
        }
    })
});

//READ API for view all employees
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined, 2));
        }
    })
});

// READ API for view single employee
router.get('/:id', (req, res) => {
    //console.log(req.params.id);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Record with given id:${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Employee:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// UPDATE API for  update single employee
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(`No Record with given this id:${req.params.id}`);

    var emp = {
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        salary: req.body.salary,
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// DELETE API for delete single employee
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))

        return res.status(400).send(`No record with given Id :  ${req.params.id}`)
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
        }

    })

});

module.exports = router;