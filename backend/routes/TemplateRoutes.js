const router = require('express').Router()

const TemplatesController = require("../controllers/TemplatesController")

//middlewares
const { imageUpload } = require('../helpers/image-upload')

router.post('/create',
imageUpload.array('images'), 
TemplatesController.create)

router.get('/', TemplatesController.getAll);
router.get('/:id', TemplatesController.getTemplateById);
router.delete('/:id', TemplatesController.removeTemplateById);

module.exports = router