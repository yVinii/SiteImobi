const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/conn"); // Importando a conexão Sequelize

const Templates = sequelize.define(
  "Templates",
  {
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailOwner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
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
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const images = this.getDataValue("images");
        return images ? JSON.parse(images) : [];
      },
      set(images) {
        this.setDataValue("images", JSON.stringify(images));
      },
    },
  },
  { timestamps: true }
);

module.exports = Templates;
