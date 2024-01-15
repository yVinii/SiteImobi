// syncDatabase.js

const sequelize = require('./conn'); // Importando a conexão Sequelize
const User = require('../models/User'); // Importando o modelo User
const Properties = require('../models/Properties'); // Importando o modelo Properties
const Broker = require('../models/Broker');
const Template = require('../models/Templates');
const City = require('../models/City');
const propertyType = require('../models/PropertyType');

//Sincronizar todos os modelos com o banco de dados

sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });
/*
 //REFAZ O BANCO DE DADOS
 
  sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas redefinidas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao redefinir tabelas:', error);
  });
*/
//
