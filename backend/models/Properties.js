const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const Properties = sequelize.define('Properties', {
  tipovenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  indativo: {
    type: DataTypes.BOOLEAN,
  },
  nquartos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipoimovel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  construidom2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  terrenom2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: true });

module.exports = Properties;
