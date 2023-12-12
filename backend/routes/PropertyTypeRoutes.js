const router = require('express').Router()

const PropertyTypeController = require("../controllers/PropertyTypeController")


router.post('/create', PropertyTypeController.create);
router.get('/:id', PropertyTypeController.getTypeById);
router.get('/', PropertyTypeController.getAll);

module.exports = router