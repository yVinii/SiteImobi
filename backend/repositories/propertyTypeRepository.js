// propertyTypeRepository.js
const PropertyType = require('../models/PropertyType');

module.exports = class PropertyTypeRepository {
    static async create(name) {
        try {
            return await PropertyType.create({ name, active: true });
        } catch (error) {
            throw new Error('Erro ao criar tipo de propriedade');
        }
    }

    static async getById(id) {
        try {
            return await PropertyType.findOne({ where: { id, active: true } });
        } catch (error) {
            throw new Error('Erro ao buscar tipo de propriedade por ID');
        }
    }

    static async getAll() {
        try {
            return await PropertyType.findAll({ where: { active: true }, order: [['createdAt', 'DESC']] });
        } catch (error) {
            throw new Error('Erro ao buscar todos os tipos de propriedade');
        }
    }
}
