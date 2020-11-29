const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log('Hello from the first middleware');
    next();
});

app.use('/', (req, res, next) => {
    console.log('Hello from the second middleware');
    res.send('<h1>Hello from the response of the second middleware</h1>');
})