const express = require("express");
const cors = require("cors");

const app = express();

// Middleware para analisar dados do corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Resolver CORS
app.use(cors({ origin: "*" }));

// Pasta pública para imagens
app.use(express.static("public"));

// Incluindo a sincronização do banco de dados
require("./db/syncDatabase");

// Rotas - endpoints
const UserRoutes = require("./routes/UserRoutes");
const PropertiesRoutes = require("./routes/PropertiesRoutes");
const BrokerRoutes = require("./routes/BrokerRoutes");
const TemplatesRoutes = require("./routes/TemplateRoutes");
const CityRoutes = require("./routes/CityRoutes");
const PropertyTypeRoutes = require("./routes/PropertyTypeRoutes");
const ClientsRouters = require("./routes/ClientRoutes");

app.use("/clients", ClientsRouters); // Corrigido aqui
app.use("/users", UserRoutes);
app.use("/properties", PropertiesRoutes);
app.use("/broker", BrokerRoutes);
app.use("/templates", TemplatesRoutes);
app.use("/city", CityRoutes);
app.use("/propertyType", PropertyTypeRoutes);

const PORT = 5502;

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://127.0.0.1:${PORT}`);
});
