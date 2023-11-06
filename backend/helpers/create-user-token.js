const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    // Cria um token JWT com base nas informações do usuário passado como parâmetro
    const token = jwt.sign({
        name: user.name, // Nome do usuário
        id: user.id // ID do usuário
    }, "nossosecret"); // Chave secreta para assinar o token

    // Retorna um objeto JSON contendo a mensagem de autenticação, o token gerado e o ID do usuário
    res.status(200).json({
        message: 'Usuário autenticado', // Mensagem de sucesso
        token: token, // Token JWT gerado
        userId: user.id, // ID do usuário associado ao token
    });
}

module.exports = createUserToken;
