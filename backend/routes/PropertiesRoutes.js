const router = require('express').Router()

const PropertiesController = require("../controllers/PropertiesController")

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', 
verifyToken, 
imageUpload.array('images'), 
PropertiesController.create)

router.get('/', PropertiesController.getAll);
router.get('/',PropertiesController.getByNeighborhood);
router.get('/getAllBrokerProperties',PropertiesController.getAllBrokerProperties);
router.get('/:id', PropertiesController.getPropertiesById)
router.delete('/:id', verifyToken, PropertiesController.removePropertiesById)

module.exports = router