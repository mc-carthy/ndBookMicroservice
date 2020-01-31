const mongoose = require('mongoose');

mongoose.model('Order', {
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        type: String,
        required: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
});