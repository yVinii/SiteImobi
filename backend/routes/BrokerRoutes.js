const router = require('express').Router()

const BrokerController = require("../controllers/BrokerController")

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, BrokerController.create)
//router.get('/', PropertiesController.getProperties);

module.exports = router