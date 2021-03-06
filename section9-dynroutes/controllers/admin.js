const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productid;

  Product.findById(productId, (product) => {
    if(!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      editing: editMode,
      product: product
    });
  })

  
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;

  if(!productId) {
    return res.redirect('/');
  }

  Product.findById(productId, (product) => {
    if(!product) {
      return res.redirect('/');
    }

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.imageDescription;

    const updatedProduct = new Product(+this.id, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    
    updatedProduct.save();

    res.redirect('/');
    

  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.deleteRemoveProduct = (req, res, next) => {
  const idToDelete = req.body.productid;

  if(!idToDelete) {
    return;
  }


  Product.remove(idToDelete);

  res.redirect('/admin/products');
};
