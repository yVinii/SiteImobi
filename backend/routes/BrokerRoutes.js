const router = require('express').Router()

const BrokerController = require("../controllers/BrokerController")

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, BrokerController.create)
router.get('/:id', BrokerController.getBrokerById);
router.get('/',verifyToken, BrokerController.getAll);
router.patch('/:id', verifyToken, BrokerController.updateBroker);
router.delete('/:id', verifyToken, BrokerController.deleteBrokerById);

module.exports = router