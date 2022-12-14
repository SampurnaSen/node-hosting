const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

console.log("inside controller");
router.get('/list', (req, res) => {
    console.log("inside /list");
    Expense.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error in retrieval:' + err);
        }
    })
})

router.get('/:id', (req, res) => {
    console.log("inside /:id");
    Expense.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error in retrieval:' + err);
        }
    })
})

router.post('/', (req, res) => {
    console.log("inside post");
    if (!req.body._id || req.body._id == '') {
        console.log('insert');
        insertRecord(req, res);
    } else {
        console.log('update')
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var expenseObj = new Expense();
    expenseObj.expense = req.body.expense;
    expenseObj.amount = req.body.amount;
    expenseObj.date = req.body.date;
    expenseObj.notes = req.body.notes;
    expenseObj.save((err, doc) => {
        if (!err) {
            res.redirect('expense/list');
        } else {
            console.log('Error during insert:' + err);
        }
    })
}

function updateRecord(req, res) {
    Expense.findOneAndUpdate(
        {_id: req.body._id},
        req.body,
        (err, doc) => {
            if (!err) {
                res.redirect('expense/list');
            } else {
                console.log('Error during update:' + err);
            }
        }
    )
}

router.delete('/delete/:id', (req, res) => {
    console.log("inside /delete/:id");
    Expense.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(200);
        } else {
            console.log('Error during update:' + err);
        }
    })
})

module.exports = router;