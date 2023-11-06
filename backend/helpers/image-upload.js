const multer = require("multer");
const path = require("path");

// Destino para armazenar as imagens
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "PropertyImages";
        cb(null, `public/images/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, 
            Date.now() + // Adiciona o timestamp ao nome do arquivo
            String(Math.floor(Math.random() * 100)) + // Adiciona um número aleatório ao nome do arquivo
            path.extname(file.originalname) // Mantém a extensão original do arquivo
        );
    },
});

// Configuração do upload de imagens usando o Multer
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        // Filtra os tipos de arquivos aceitos (apenas .png ou .jpg)
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg ou png"));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };
