const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getSelectedProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product description',
      path: '/products'
    });
  })
  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getCart(cart => {

    Product.fetchAll(products => {

      const cartProducts = [];
      for(product of products) {
        // If the product is in the cart, we add it to cartProducts
        if(cart.products.find(prod => prod.id === product.id)) {
          const cartProductData = cart.products.find(prod => prod.id === product.id);
          cartProducts.push({productData: product, qty: cartProductData.qty});
        } 
      }
      if(cart == null) {

      }
  
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });

    });

    
  });
  
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {

    if(!product) {
      return;
    }


    Cart.addProduct(productId, product.price);
    res.redirect('/');

  })
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
  
};
