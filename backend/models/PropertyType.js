const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const PropertyType = sequelize.define('PropertyType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
}, { timestamps: true });


module.exports = PropertyType;
