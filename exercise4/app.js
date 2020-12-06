const express = require('express');


const app = express();

app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.send('Coucou');
// });
// app.post('/add-user', (req, res) => {
//     res.redirect('/');
// });

app.listen(3000);