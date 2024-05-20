const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/conn");
const Properties = require("./Properties");

const Cliente = sequelize.define(
  "Cliente",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Cliente",
    timestamps: true,
  }
);

Cliente.belongsTo(Properties, {
  constraints: true,
  foreignKey: "idProperty",
});

Properties.hasMany(Cliente, {
  foreignKey: "idProperty",
});

module.exports = Cliente;
