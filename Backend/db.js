const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudDB', (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeded.');
    } else {
        console.log("Error in connection:" + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;