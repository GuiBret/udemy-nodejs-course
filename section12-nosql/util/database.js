const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (_cb) => {
  MongoClient.connect('mongodb+srv://nodejsuser:nodejspassword@cluster0.a7jln.mongodb.net/shop?retryWrites=true&w=majority')
             .then(client => {
               _db = client.db();

               _cb();
             })
             .catch(err => console.log(err));
}

const getDB = () => {
  if(_db) {
    return _db;
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;