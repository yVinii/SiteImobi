const jwt = require('jsonwebtoken');
const getTokenFunction = require('./get-token');

// Middleware para validar o token de autenticação
const checkToken = (req, res, next) => {
    // Verifica se o cabeçalho de autorização está presente na requisição
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso Negado!' });
    }

    // Obtém o token do cabeçalho da requisição
    const token = getTokenFunction(req);

    // Verifica se o token está presente na requisição
    if (!token) {
        return res.status(401).json({ message: 'Acesso Negado!' });
    }

    try {
        // Verifica se o token é válido usando a chave secreta ('nossosecret')
        const verified = jwt.verify(token, 'nossosecret');
        
        // Se o token for válido, atribui as informações do usuário verificado ao objeto de requisição (req)
        req.user = verified;
        next(); // Chama a próxima função no pipeline de requisições

    } catch (error) {
        return res.status(400).json({ message: 'Token Inválido!' });
    }
};

module.exports = checkToken;
