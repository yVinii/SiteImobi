// Importando e configurando o módulo de roteamento do Express
const router = require('express').Router();

// Importando o controlador de corretores para lidar com as requisições
const BrokerController = require('../controllers/BrokerController');

// Importando middleware para verificar o token
const verifyToken = require('../helpers/verify-token');

// Rotas para operações relacionadas a corretores
router.post('/create', verifyToken, BrokerController.create);
// Rota para criar um novo corretor, com verificação de token

router.get('/:id', BrokerController.getBrokerById);
// Rota para obter um corretor por ID

router.get('/', verifyToken, BrokerController.getAll);
// Rota para obter todos os corretores, com verificação de token

router.patch('/:id', verifyToken, BrokerController.updateBroker);
// Rota para atualizar um corretor por ID, com verificação de token

router.delete('/:id', verifyToken, BrokerController.deleteBrokerById);
// Rota para excluir um corretor por ID, com verificação de token

// Exportando as rotas configuradas
module.exports = router;
