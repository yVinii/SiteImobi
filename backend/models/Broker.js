const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const Broker = sequelize.define('Broker', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creci: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: true });

const Properties = require('./Properties');
Broker.hasMany(Properties, { foreignKey: 'propertiesId' });
Properties.belongsTo(Broker, { foreignKey: 'propertiesId' });

module.exports = Broker;
