const router = require('express').Router()

const UserController = require('../controllers/UserController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require("../helpers/image-upload")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
//router.get('/checkuser', UserController.)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)
module.exports = router