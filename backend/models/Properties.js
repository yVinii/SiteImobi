// Importação do Sequelize e da conexão com o banco de dados
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const Broker = require('./Broker');

// Definição do modelo Properties com seus atributos e configurações
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
        type: DataTypes.JSON, // ou TEXT, dependendo da preferência
        allowNull: false,
        get() {
            const images = this.getDataValue('images');
            return images ? JSON.parse(images) : [];
        },
        set(images) {
            this.setDataValue('images', JSON.stringify(images));
        },
    },
}, { timestamps: true });

// Associação entre a entidade Broker e Properties
Properties.belongsTo(Broker, {
    constraints: true,
    foreignKey: 'idBroker'
});

Broker.hasMany(Properties, {
    foreignKey: 'idBroker'
});

// Exportação do modelo Properties para ser utilizado em outras partes da aplicação
module.exports = Properties;
