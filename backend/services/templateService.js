// templatesService.js
const TemplatesRepository = require('../repositories/templateRepository');

module.exports = class TemplatesService {
    static async create(templateData) {
        const { owner, emailOwner, phone, city, propertytype, description, typeofsale, images } = templateData;

        // Validação
        if (!owner || !emailOwner || !phone || !city || !propertytype || !description || !typeofsale || images.length === 0) {
            throw new Error('Todos os campos são obrigatórios');
        }

        return await TemplatesRepository.create({
            owner,
            emailOwner,
            phone,
            city,
            propertytype,
            description,
            typeofsale,
            images,
            active: true,
        });
    }

    static async getById(id) {
        return await TemplatesRepository.findById(id);
    }

    static async getAllActive() {
        return await TemplatesRepository.findAllActive();
    }

    static async deactivateById(id) {
        await TemplatesRepository.deactivateById(id);
    }
};
