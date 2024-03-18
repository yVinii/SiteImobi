const router = require('express').Router()

const NeighborhoodController = require("../controllers/NeighborhoodController")


router.post('/create', NeighborhoodController.create)
router.get('/:id', NeighborhoodController.getById);
router.get('/', NeighborhoodController.getAll);

module.exports = router