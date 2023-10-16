const multer = require("multer")
const path = require("path")

//destination to store the images
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ""
        folder = "PropertyImages"
        cb(null, `public/images/${folder}`)
},
    filename: function(req, file, cb){
        cb(null, 
        Date.now() +
        String(Math.floor(Math.random()* 100)) +
        path.extname(file.originalname),
        )
    },
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie apenas jpg ou png"))
        }
        cb(undefined, true)
    },
})

module.exports = { imageUpload }