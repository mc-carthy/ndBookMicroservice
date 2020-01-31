const express = require('express');
const app = express();

app.listen(4545, () => {
    console.log('Book service listening on port 4545');
});

app.get('/', (req, res) => {
    res.send('Root endpoint');
});