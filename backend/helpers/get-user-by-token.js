const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Obtém o usuário associado a um token JWT
const getUserByToken = async (token) => {
    // Verifica se o token está ausente
    if (!token) {
        // Se o token estiver ausente, é retornado um erro de acesso negado
        return { error: 'Acesso Negado! - Token não fornecido' };
    }

    try {
        // Decodifica o token JWT usando a chave secreta 'nossosecret'
        const decoded = jwt.verify(token, 'nossosecret');

        // Extrai o ID do usuário do token decodificado
        const userId = decoded.id;

        // Encontra o usuário no banco de dados com base no ID
        const user = await User.findOne({ where: { id: userId } });

        return user;
    } catch (error) {
        // Retorna um erro caso ocorra algum problema na verificação do token ou na busca do usuário
        return { error: 'Erro ao recuperar usuário pelo token' };
    }
}

module.exports = getUserByToken;
