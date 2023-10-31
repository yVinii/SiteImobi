const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize
const Broker = require('./Broker');

const Properties = sequelize.define('Properties', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeofsale: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  nbedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  propertytype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buildm2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groundm2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nsuites: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nvacancies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nbathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  register: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Pode usar TEXT se preferir
    allowNull: false,
    get() {
      // Aqui você pode personalizar como as imagens são recuperadas
      const images = this.getDataValue('images');
      return images ? JSON.parse(images) : [];
    },
    set(images) {
      // Aqui você pode personalizar como as imagens são armazenadas
      this.setDataValue('images', JSON.stringify(images));
    },
  },
}, { timestamps: true });

Properties.belongsTo(Broker, {
  constraints: true,
  foreignKey:  'idBroker'
})

Broker.hasMany(Properties,{
  foreignKey: 'idBroker'
})


module.exports = Properties;
