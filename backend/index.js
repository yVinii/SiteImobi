const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

// Middleware para analisar dados do corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//solve CORS
app.use(cors({ origin: '*' }));

//public folder for images
app.use(express.static('public'))
// Incluindo a sincronização do banco de dados
require('./db/syncDatabase');

//rotas - endpoints
const UserRoutes = require('./routes/UserRoutes');
const PropertiesRoutes = require('./routes/PropertiesRoutes');
const BrokerRoutes = require('./routes/BrokerRoutes');
const TemplatesRoutes = require('./routes/TemplateRoutes');
const CityRoutes = require('./routes/CityRoutes');
const PropertyTypeRoutes = require('./routes/PropertyTypeRoutes');
const NeighborhoodRoutes = require('./routes/NeighborhoodRoutes');

app.use('/users', UserRoutes);
app.use('/properties', PropertiesRoutes);
app.use('/broker', BrokerRoutes);
app.use('/templates', TemplatesRoutes);
app.use('/city', CityRoutes);
app.use('/propertyType', PropertyTypeRoutes);
app.use('/neighborhood',NeighborhoodRoutes);

const PORT = 5502;


app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando em http://127.0.0.1:${PORT}`);
  });