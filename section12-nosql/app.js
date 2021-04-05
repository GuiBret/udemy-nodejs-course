const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('606b4bcbf39b12618fa86e3e')
    .then(user => {
      req.user = user;
      console.log('User found');
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes); 

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
})

app.use(errorController.get404);
