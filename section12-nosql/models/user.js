const getDB = require('../util/database').getDB;
const ObjectId = require('mongodb').ObjectId;
class User {
  constructor(username, email, id) {
    this.username = username;
    this.email = email;
    this._id = (id) ? new ObjectId(id) : null;
  }

  save() {
    const db = getDB();
    let dbOp;

    if(this._id) {
      dbOp = db.collection('users')
               .updateOne({ _id: this._id}, { $set: this});
    } else {
      dbOp = db.collection('users').insertOne(this);
    }

    return dbOp
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err);
            })
  }

  static findById(userId) {
    const db = getDB();
    return db.collection('users')
             .find({ _id: new ObjectId(userId)})
             .next()
             .then(user => {
               return user;
             })
             .catch(err => {
               console.log(err);
             })

  }
}

module.exports = User;