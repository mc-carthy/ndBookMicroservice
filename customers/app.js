const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./customer')
const Customer = mongoose.model("Customer");

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@customerservice-3dgda.mongodb.net/test?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log('Customer service db connected successfully')
);

app.listen(5555, () => {
    console.log('Customer service listening on port 5555');
});

app.get('/', (req, res) => {
    res.send('Customer service root endpoint');
});

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.get('/customers/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
})

app.post('/customer', (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    let customer = new Customer(newCustomer);

    customer.save().then(() => {
        console.log('New customer created')
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("Customer created successfully");
});

app.delete('/customer/:id', (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send('Customer removed successfully');
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});