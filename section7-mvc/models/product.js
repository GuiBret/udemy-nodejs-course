const products = [];
const { deepStrictEqual } = require('assert');
const fs = require('fs');
const path = require('path');

// Searches the products in the file
const getProductsFromFile = (cb) => {
    const p = path.join(__dirname, '..', 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            console.log("Error : " + err);
            if(err) {
                cb([]);
            } else {
                
                cb(JSON.parse(fileContent));
            }


        });
}

module.exports = class Product {
    

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            console.log(products);
            products.push(this);
            
            const p = path.join(__dirname, '..', 'data', 'products.json');

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

        
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
        
    }



}