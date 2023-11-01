const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/conn'); // Importando a conexão Sequelize

const Templates = sequelize.define(
    'Templates',
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


module.exports = Templates;
