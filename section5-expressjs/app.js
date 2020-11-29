

const express = require('express');
const app = express();


app.use('/add-product', (req, res, next) => {
    console.log('In the middleware 23!');
    res.send('<h1>Hello from the "Add product" page ! </h1>')

});
app.use('/', (req, res, next) => {
    console.log('In the middleware 23!');
    res.send('<h1>Hello from Express ! </h1>')

});

app.listen(3000);
