const express = require('express');
const path = require('path');
const app = express();


app.get('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});


app.listen(3001);