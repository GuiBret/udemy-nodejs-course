const Sequelize = require('sequelize');

const sequelize = require("../util/database");

const User = sequelize.define('user', 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            default: ''
        },
        email: {
            type: Sequelize.STRING,
            default: ''
        }
});

module.exports = User;