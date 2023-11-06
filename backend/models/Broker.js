// Importação do Sequelize e da conexão com o banco de dados
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); // Importando a conexão Sequelize

// Definição do modelo Broker com seus atributos e configurações
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

// Exporta o modelo Broker para ser utilizado em outras partes da aplicação
module.exports = Broker;
