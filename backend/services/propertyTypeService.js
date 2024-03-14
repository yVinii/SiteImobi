// propertyTypeService.js
const PropertyTypeRepository = require('../repositories/propertyTypeRepository');

module.exports = class PropertyTypeService {
    static async create(name) {
        try {
            return await PropertyTypeRepository.create(name);
        } catch (error) {
            throw new Error('Erro interno do servidor');
        }
    }

    static async getById(id) {
        try {
            return await PropertyTypeRepository.getById(id);
        } catch (error) {
            throw new Error('Erro interno do servidor');
        }
    }

    static async getAll() {
        try {
            return await PropertyTypeRepository.getAll();
        } catch (error) {
            throw new Error('Erro interno do servidor');
        }
    }
}
