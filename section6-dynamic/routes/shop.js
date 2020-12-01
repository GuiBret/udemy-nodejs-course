const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');
const products = adminData.products;

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  res.render('shop', {prods: products, docTitle: "Shop"});
});

module.exports = router;
