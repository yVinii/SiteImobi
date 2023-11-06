// Importando e configurando o módulo de roteamento do Express
const router = require('express').Router();

// Importando o controlador do usuário para lidar com as requisições
const UserController = require('../controllers/UserController');

// Importando middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

// Rotas para operações relacionadas aos usuários
router.post('/register', UserController.register); // Rota para registrar um novo usuário
router.post('/login', UserController.login); // Rota para autenticar o usuário
router.get('/checkuser', UserController.checkUser); // Rota para verificar o usuário
router.get('/:id', UserController.getUserById); // Rota para obter um usuário por ID
router.patch('/edit/:id', verifyToken, UserController.editUser); // Rota para editar informações do usuário por ID

// Exportando as rotas configuradas
module.exports = router;
