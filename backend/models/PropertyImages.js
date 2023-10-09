const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn');

const PropertyImages = sequelize.define('PropertyImages', {
  image: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, { timestamps: false });

module.exports = PropertyImages;

const PropertyImages = require('./PropertyImages');

Properties.hasMany(PropertyImages, { foreignKey: 'propertyId' });
PropertyImages.belongsTo(Properties, { foreignKey: 'propertyId' });
