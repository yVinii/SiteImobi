const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//solve CORS
//app.use(cors({ credentials: true, origin: 'htpp://localhost:3000'}))

//public folder for images
app.use(express.static('public'))

// Incluindo a sincronização do banco de dados
require('./db/syncDatabase');

//rotas - endpoints
const UserRoutes = require('./routes/UserRoutes')
const PropertiesRoutes = require('./routes/PropertiesRoutes')
const BrokerRoutes = require('./routes/BrokerRoutes')

app.use('/users', UserRoutes)
app.use('/properties', PropertiesRoutes)
app.use('/broker', BrokerRoutes)

app.listen(5000)