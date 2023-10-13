const router = require('express').Router()

const PropertiesController = require("../controllers/PropertiesController")

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, PropertiesController.create)
//router.get('/', PropertiesController.getProperties);

module.exports = router