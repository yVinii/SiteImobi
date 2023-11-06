// Importações necessárias para configurar e conectar o Sequelize ao banco de dados
const { Sequelize } = require('sequelize');

// Configuração e estabelecimento da conexão com o banco de dados MySQL
const sequelize = new Sequelize('imobilsilva', 'root', '', {
    host: 'localhost',  // Host do banco de dados
    dialect: 'mysql',   // Tipo do banco de dados
});

// Tentativa de autenticar a conexão com o banco de dados
try {
    sequelize.authenticate();  // Verifica se a conexão é estabelecida com sucesso
    console.log('Conexão realizada MySQL!');  // Mensagem de sucesso se a conexão for bem-sucedida
} catch (error) {
    console.log(`Não foi possível conectar : ${error}`);  // Mensagem de erro se a conexão falhar
}

module.exports = sequelize;  // Exporta a configuração da conexão para uso em outros arquivos
