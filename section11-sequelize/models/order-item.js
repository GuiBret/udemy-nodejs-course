const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const OrderItem = sequelize.define('orderitem', {
  
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    qty: {
        type: Sequelize.INTEGER
    }
  
});

module.exports = OrderItem;