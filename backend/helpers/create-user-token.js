const jwt = require("jsonwebtoken");

const createUserToken = async (user) => {
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, "nossosecret");

    // return token
    return token;
};

module.exports = createUserToken;
