// Importando o Sequelize e a conexão com o banco de dados
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

// Definição do modelo Templates com seus atributos e configurações
const Templates = sequelize.define('Templates', {
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailOwner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    propertytype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeofsale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
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

// Exportando o modelo Templates para ser usado em outras partes da aplicação
module.exports = Templates;
