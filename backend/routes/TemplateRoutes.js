// Importando e configurando o módulo de roteamento do Express
const router = require('express').Router();

// Importando o controlador de templates para lidar com as requisições
const TemplatesController = require('../controllers/TemplatesController');

// Importando middlewares
const { imageUpload } = require('../helpers/image-upload');

// Rotas para operações relacionadas a templates
router.post('/create', imageUpload.array('images'), TemplatesController.create);
// Rota para criar um novo template utilizando um middleware de upload de imagens

router.get('/', TemplatesController.getAll); // Rota para obter todos os templates
router.get('/:id', TemplatesController.getTemplateById); // Rota para obter um template por ID
router.delete('/:id', TemplatesController.removeTemplateById); // Rota para remover um template por ID

// Exportando as rotas configuradas
module.exports = router;
