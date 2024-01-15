const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('imobilsilva', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})
try{
    sequelize.authenticate()
    console.log('Conexão realizada MySQL!')

} catch(error) {
    console.log(`Não foi possível conectar : ${error}`)
}

module.exports = sequelize;