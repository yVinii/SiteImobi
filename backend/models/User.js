// Importando o Sequelize para a definição do modelo e tipos de dados
const { Sequelize, DataTypes } = require('sequelize');

// Importando a conexão com o banco de dados
const sequelize = require('../db/conn');

// Definição do modelo de usuário (User) com seus atributos e configurações
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: true, // Ativa a marcação de tempo para os registros no banco de dados
});

// Exportando o modelo User para ser usado em outras partes da aplicação
module.exports = User;
