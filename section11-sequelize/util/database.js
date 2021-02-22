const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'nodecomplete', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;