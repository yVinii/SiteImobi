const jwt = require("jsonwebtoken")

const createUserToken = async(user, req, res) =>{
   // create token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    },"nossosecret")

    //return token
    res.status(200).json({
        message: 'Usuário autentificado',
        token: token,
        userId: user.id,
    })
}

module.exports = createUserToken