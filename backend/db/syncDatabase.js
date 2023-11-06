// Importações dos módulos e modelos necessários
const sequelize = require('./conn');
const User = require('../models/User');
const Properties = require('../models/Properties');
const Broker = require('../models/Broker');
const Template = require('../models/Templates');

// Sincroniza os modelos definidos no Sequelize com o banco de dados.
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!'); // Mensagem de sucesso ao sincronizar tabelas
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error); // Mensagem de erro, caso ocorra um problema na sincronização
  });

// Código para recriar o banco de dados (use com extrema cautela)
/*
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas redefinidas com sucesso!'); // Mensagem de sucesso ao redefinir tabelas
  })
  .catch((error) => {
    console.error('Erro ao redefinir tabelas:', error); // Mensagem de erro, caso ocorra um problema na redefinição das tabelas
  });
*/
