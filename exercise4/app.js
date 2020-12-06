const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const users = [];

// Add bodyparser for POST /add-user
app.use(bodyParser.urlencoded({extended: false}));

// Add EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    
    res.render('index');
});

app.get('/users', (req, res) => {
    res.render('users', {users: users});
});

app.post('/add-user', (req, res) => {
    let username = req.body.username;
    users.push(username);
    res.redirect('/');
});

app.listen(3000);