const express = require('express');
const bodyparser = require('body-parser');
require('./models/db');
const expenseController = require('./controller/expenseController');

var cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    // res.json(req.body);
    res.send(`
        <h2>Sam's expense dashboard</h2>
        <h3>Click here to get access to the <b><a href="/expense/list">Database</a></b></h3>`);
});

app.use("/expense", expenseController);

app.listen(3000, () => console.log('Server started!'));