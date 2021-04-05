const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    return db.collection('products').insertOne(this)
                             .then(res => {
                              console.log(res);
                             })
                             .catch(err => {
                               console.log(err);
                             });
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products')
             .find()
             .toArray()
             .then(products => {
               return products;
             })
             .catch();
  }

  static findById(productId) {
    const db = getDB();
    return db.collection('products')
             .find({_id: new mongodb.ObjectId(productId)})
             .next()
             .then(product => { 
               console.log(product);
               return product;
             })
             .catch(err => {
               console.log(err);
             })
  }
}

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
