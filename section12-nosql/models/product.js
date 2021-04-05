const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {


    const db = getDB();
    let dbOp = "";

    // Update existing product
    if(this._id) {
      dbOp = db.collection('products')
               .updateOne({_id: this._id }, { $set: this });
    } else { // Insert new argument
      
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
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

  static deleteById(productId) {
    const db = getDB();

    return db.collection('products')
      .deleteOne({_id : new mongodb.ObjectId(productId)})
      .then(product => {
        console.log('Product deleted');
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
