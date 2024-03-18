const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 


const TypeOfSale = sequelize.define('TypeOfSale', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});


module.exports = TypeOfSale;
