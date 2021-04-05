const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (_cb) => {
  MongoClient.connect('mongodb+srv://nodejsuser:nodejspassword@cluster0.a7jln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
             .then(result => {
               console.log('Connected');
               _cb(result);
             })
             .catch(err => console.log(err));
}



module.exports = mongoConnect;