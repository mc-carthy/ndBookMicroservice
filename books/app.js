const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./book')
const Book = mongoose.model("Book");

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@bookservice-k3mbd.mongodb.net/test?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log('Book service db connected successfully')
);

app.listen(4545, () => {
    console.log('Book service listening on port 4545');
});

app.get('/', (req, res) => {
    res.send('Book service root endpoint');
});

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        res.json(books);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
})

app.post('/book', (req, res) => {
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numPages: req.body.numPages,
        publisher: req.body.publisher
    };

    let book = new Book(newBook);

    book.save().then(() => {
        console.log('New book created')
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("Book created successfully");
});

app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send('Book removed successfully');
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});