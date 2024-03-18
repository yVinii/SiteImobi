const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 
const City = require('./City');

const Neighborhood = sequelize.define('Neighborhood', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

Neighborhood.belongsTo(City, {
    constraints: true,
    foreignKey:  'idCity'
  });
  
  City.hasMany(Neighborhood,{
    foreignKey: 'idCity'
  });

module.exports = Neighborhood;
