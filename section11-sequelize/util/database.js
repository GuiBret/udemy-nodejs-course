const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'user', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;