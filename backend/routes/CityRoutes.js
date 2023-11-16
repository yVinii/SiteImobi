const router = require('express').Router()

const CityController = require("../controllers/CityController")


router.post('/create', CityController.create)
router.get('/:id', CityController.getCityById);
router.get('/', CityController.getAll);

module.exports = router