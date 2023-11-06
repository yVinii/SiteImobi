const getToken = (req) => {
    // Obtém o cabeçalho de autorização da solicitação
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho de autorização está presente e se está no formato esperado
    if (authHeader && authHeader.split(" ")[0] === 'Bearer') {
        // Separa o token do prefixo 'Bearer' (o token JWT normalmente é precedido por 'Bearer')
        const token = authHeader.split(" ")[1];
        return token; // Retorna o token JWT
    } else {
        return null; // Retorna nulo se o cabeçalho de autorização não estiver presente ou não estiver no formato esperado
    }
}

module.exports = getToken;
