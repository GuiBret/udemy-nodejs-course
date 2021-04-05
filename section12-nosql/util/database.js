const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (_cb) => {
  MongoClient.connect('mongodb+srv://nodejsuser:nodejspassword@cluster0.a7jln.mongodb.net/shop?retryWrites=true&w=majority')
             .then(result => {
               _db = client.db();

               _cb(result);
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