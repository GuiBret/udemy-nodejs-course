const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
    console.log('Hello from the first middleware');

    
    res.send('<h1>My user list</h1><ul><li>User 1</li><li>User 2</li></ul>');

});

app.use('/', (req, res, next) => {
    console.log('Hello from the second middleware');
    
    res.send('<html><body><h1>Hello from my Express server</h1><form method="POST" action="/create-user"><input type="text" name="username" /><input type="submit"/></form></body></html>');
    
});

app.listen(3000);

