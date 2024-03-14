// propertyTypeController.js
const PropertyTypeService = require('../services/propertyTypeService');

module.exports = class PropertyTypeController {
    static async create(req, res) {
        try {
            const { name } = req.body;

            // Validando se o nome foi fornecido
            if (!name) {
                return res.status(422).json({ message: 'O nome é obrigatório' });
            }

            const newPropertyType = await PropertyTypeService.create(name);

            res.status(201).json({
                message: 'Tipo de Propriedade cadastrado com Sucesso',
                newPropertyType,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async getTypeById(req, res) {
        try {
            const id = req.params.id;

            const propertyType = await PropertyTypeService.getById(id);

            res.status(200).json({ propertyType });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async getAll(req, res) {
        try {
            const propertyTypes = await PropertyTypeService.getAll();

            res.status(200).json({ propertyTypes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
