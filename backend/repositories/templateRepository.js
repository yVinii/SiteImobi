// templatesRepository.js
const  Templates  = require('../models/Templates');

module.exports = class TemplatesRepository {
    static async create(templateData) {
        return await Templates.create(templateData);
    }

    static async findById(id) {
        return await Templates.findByPk(id);
    }

    static async findAllActive() {
        return await Templates.findAll({ where: { active: true } });
    }

    static async deactivateById(id) {
        const template = await Templates.findByPk(id);
        if (!template) return null;
        
        template.active = false;
        await template.save();
        return template;
    }
};
