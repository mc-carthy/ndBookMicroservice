const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./order')
const Order = mongoose.model("Order");

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@orderservice-of1hh.mongodb.net/test?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log('Order service db connected successfully')
);

app.listen(6565, () => {
    console.log('Order service listening on port 5555');
});

app.get('/', (req, res) => {
    res.send('Order service root endpoint');
});

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.get('/orders/:id', (req, res) => {
    Orders.findById(req.params.id).then((order) => {
        if (order) {
            res.json(order);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
})

app.post('/order', (req, res) => {
    let newOrder = {
        customerId: req.body.customerId,
        bookId: req.body.bookId,
        orderDate: req.body.orderDate,
        returnDate: req.body.returnDate
    };

    let order = new Order(newOrder);

    order.save().then(() => {
        console.log('New order created')
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("Order created successfully");
});

app.delete('/order/:id', (req, res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send('Order removed successfully');
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});