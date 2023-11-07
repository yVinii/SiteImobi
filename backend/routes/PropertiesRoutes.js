const router = require('express').Router()

const PropertiesController = require("../controllers/PropertiesController")

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', 
imageUpload.array('images'), 
PropertiesController.create)

router.get('/', PropertiesController.getAll);
router.get('/getAllBrokerProperties/:id',PropertiesController.getAllBrokerProperties);
router.get('/:id', PropertiesController.getPropertiesById);
router.delete('/:id', verifyToken, PropertiesController.removePropertiesById);
router.patch('/:id', verifyToken, imageUpload.array('images'), PropertiesController.updateProperty);
router.get('/unique-neighborhoods', PropertiesController.getUniqueNeighborhoods);
router.get('/unique-city', PropertiesController.getUniqueCity);

module.exports = router