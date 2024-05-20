const router = require("express").Router();

const ClienteController = require("../controllers/ClienteController");

router.get("/", ClienteController.getAll);
router.get("/:id", ClienteController.getById);
router.post("/add", ClienteController.create);
router.delete("/:id", ClienteController.delete);

module.exports = router;
