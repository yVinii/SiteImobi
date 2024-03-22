const router = require('express').Router()

const CityController = require("../controllers/CityController")

router.get('/', CityController.getAll);
router.get('/:id', CityController.getCityById);
router.post('/create', CityController.create)



module.exports = router