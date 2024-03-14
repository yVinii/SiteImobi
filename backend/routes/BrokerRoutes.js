const router = require('express').Router()

const BrokerController = require("../controllers/BrokerController")

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, BrokerController.create)
router.get('/:id', BrokerController.getById);
router.get('/', BrokerController.getAll);
router.patch('/:id', verifyToken, BrokerController.update);
router.delete('/:id', verifyToken, BrokerController.delete);

module.exports = router