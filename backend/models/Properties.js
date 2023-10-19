const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const Properties = sequelize.define('Properties', {
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
}, { timestamps: true });

// Definindo a associação
Properties.associate = models => {
  // Properties pertence a um Broker
  Properties.belongsTo(models.Broker, {
    foreignKey: 'brokerId', // A chave estrangeira que será adicionada à tabela Properties
    as: 'broker', // Alias para a relação
  });
};


module.exports = Properties;
