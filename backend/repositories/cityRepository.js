const City = require('../models/City');

module.exports = class CityRepository {
    static async create(cityData) {
        return await City.create(cityData);
    }

    static async getById(id) {
        return await City.findOne({ where: { id, active: true } });
    }

    static async getAll() {
        return await City.findAll({ where: { active: true }, order: [['createdAt', 'DESC']] });
    }
}
