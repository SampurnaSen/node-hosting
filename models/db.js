const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sam:sam123@cluster0.wt90i.mongodb.net/MyExpenseTracker', {
    useNewUrlParser: true
},
err => {
    if (!err) {
        console.log('Connection succeeded');
    } else {
        console.log('Error in connection' + err);
    }
});

require('./expense.model');