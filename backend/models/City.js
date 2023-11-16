const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
}, { 
    tableName: 'City',
    timestamps: true 
});


module.exports = City;
