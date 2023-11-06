// Importando as dependências necessárias
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicialização do aplicativo Express
const app = express();

// Middleware para analisar dados do corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors({ origin: '*' }));

// Configuração para servir arquivos estáticos na pasta 'public'
app.use(express.static('public'));

// Incluindo a sincronização do banco de dados (assumindo que existe um arquivo para isso)
require('./db/syncDatabase');

// Definição de rotas e endpoints para diferentes recursos
const UserRoutes = require('./routes/UserRoutes');
const PropertiesRoutes = require('./routes/PropertiesRoutes');
const BrokerRoutes = require('./routes/BrokerRoutes');
const TemplatesRoutes = require('./routes/TemplateRoutes');

// Configuração das rotas para diferentes recursos
app.use('/users', UserRoutes);
app.use('/properties', PropertiesRoutes);
app.use('/broker', BrokerRoutes);
app.use('/templates', TemplatesRoutes);

// Porta em que o servidor irá escutar
const PORT = 5502;

// Inicia o servidor e escuta requisições na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando em http://127.0.0.1:${PORT}`);
});
