const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {

      if(!this.id) {
        this.id = Math.random().toString();
      } else {
        const existingProductIdx = products.findIndex((product) => product.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIdx] = this;
        
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {

        }); 
      }
      
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
    });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id == id);
      cb(product);
      
    });
    
  }

  static remove(id) {
    getProductsFromFile((products) => {
      
      const productToDeleteIdx = products.findIndex((product) => product.id === id);
      const product = products[productToDeleteIdx];
      if(productToDeleteIdx !== -1) {

        products.splice(productToDeleteIdx, 1);
        fs.writeFile(p, JSON.stringify(products), err => {
          Cart.deleteProduct(id, product.price);
          
        });

      }
    });
  }
};
  