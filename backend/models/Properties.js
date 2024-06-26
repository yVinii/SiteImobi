const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/conn");
const Broker = require("./Broker");
const City = require("./City");
const PropertyType = require("./PropertyType");

const Properties = sequelize.define(
  "Properties",
  {
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
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    nbedrooms: {
      type: DataTypes.INTEGER,
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
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerPhone: {
      type: DataTypes.STRING,
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

Properties.belongsTo(Broker, {
  constraints: true,
  foreignKey: "idBroker",
});

Broker.hasMany(Properties, {
  foreignKey: "idBroker",
});

Properties.belongsTo(City, {
  constraints: true,
  foreignKey: "idCity",
});

City.hasMany(Properties, {
  foreignKey: "idCity",
});

Properties.belongsTo(PropertyType, {
  constraints: true,
  foreignKey: "idPropertyType",
});

PropertyType.hasMany(Properties, {
  foreignKey: "idPropertyType",
});

module.exports = Properties;
