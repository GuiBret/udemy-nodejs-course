const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};

            if(!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIdx = cart.products.findIndex((product) => product.id === id);
            const existingProduct = cart.products[existingProductIdx];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {... existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [... cart.products];
                cart.products[existingProductIdx] = updatedProduct;


            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [... cart.products, updatedProduct];
            }

            cart.totalPrice += productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        })
        // Fetch the previous cart
        // Analyze the cart => Find existing product
        // Add new product / increase qty
    }
    

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err) return;

            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};

            const productIndex = updatedCart.products.findIndex((prod) => prod.id === id);
            const productQty = updatedCart.products[productIndex].qty;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice -= (productPrice * productQty);

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err) console.log(err);
            });

        });
    }

    static getCart(cb) {

        fs.readFile(p, (err, fileContent) => {

            if(err) {
                cb(null);
            }

            const cart = JSON.parse(fileContent);
            cb(cart);

        });
    }

    

}