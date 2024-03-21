const City = require('../models/City');

module.exports = class CityRepository {
    static async create(cityData) {
        return await City.create(cityData);
    }

    static async getById(id) {
        try {
            return await City.findOne({ where: { id, active: true } });
        } catch(error){
            throw new Error(error.message);
        }
    }

    static async getAll() {
        return await City.findAll({ where: { active: true }, order: [['createdAt', 'DESC']] });
    }
}
