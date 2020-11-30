const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    
    // res.send('<h1>Hello from the "Add product" page ! </h1>');
    res.send('<form method="POST" action="/product"><input type="text" name="title"><button type="submit">Add Product</button></form>');

});
router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;