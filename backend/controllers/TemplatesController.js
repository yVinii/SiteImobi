// templatesController.js
const TemplatesService = require('../services/templateService');

module.exports = class TemplatesController {
    static async create(req, res) {
        try {
            const templateData = req.body;
            templateData.images = req.files.map(file => file.filename);

            const newTemplate = await TemplatesService.create(templateData);

            res.status(201).json({
                message: 'Template cadastrado com sucesso',
                newTemplate,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }

    static async getAll(req, res) {
        try {
            const templates = await TemplatesService.getAllActive();
            res.status(200).json({ templates });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }

    static async getTemplateById(req, res) {
        try {
            const id = req.params.id;
            const template = await TemplatesService.getById(id);

            if (!template) {
                return res.status(404).json({ message: 'Template não encontrado' });
            }

            res.status(200).json({ template });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }

    static async removeTemplateById(req, res) {
        try {
            const id = req.params.id;
            await TemplatesService.deactivateById(id);

            res.status(200).json({ message: 'Template marcado como inativo com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }
};
