// Importando e configurando o módulo de roteamento do Express
const router = require('express').Router();

// Importando o controlador de propriedades para lidar com as requisições
const PropertiesController = require('../controllers/PropertiesController');

// Importando middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

// Rotas para operações relacionadas a propriedades
router.post('/create', verifyToken, imageUpload.array('images'), PropertiesController.create);
// Rota para criar uma nova propriedade, incluindo um middleware para verificar o token e um middleware para upload de imagens

router.get('/', PropertiesController.getAll); // Rota para obter todas as propriedades
router.get('/getAllBrokerProperties/:id', PropertiesController.getAllBrokerProperties); // Rota para obter todas as propriedades de um corretor por ID
router.get('/:id', PropertiesController.getPropertiesById); // Rota para obter uma propriedade por ID
router.delete('/:id', verifyToken, PropertiesController.removePropertiesById); // Rota para remover uma propriedade por ID, com verificação de token
router.patch('/:id', verifyToken, imageUpload.array('images'), PropertiesController.updateProperty);
// Rota para atualizar uma propriedade por ID, com verificação de token e upload de imagens
router.get('/unique-neighborhoods', PropertiesController.getUniqueNeighborhoods); // Rota para obter bairros únicos
router.get('/unique-city', PropertiesController.getUniqueCity); // Rota para obter cidades únicas

// Exportando as rotas configuradas
module.exports = router;
