const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://admin:admin@bookservice-k3mbd.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
},
console.log('Book service db connected successfully'));

app.listen(4545, () => {
    console.log('Book service listening on port 4545');
});

app.get('/', (req, res) => {
    res.send('Root endpoint');
});