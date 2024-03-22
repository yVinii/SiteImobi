const CityRepository = require('../repositories/cityRepository');

module.exports = class CityService {
    static async create(cityData) {
        if (!cityData.name) {
            throw new Error('O nome da cidade é obrigatório');
        }
        cityData.active = true;
        return await CityRepository.create(cityData);
    }

    static async getById(id) {
        const city = await CityRepository.getById(id);
        if (!city) {
            throw new Error('Cidade não cadastrada ou inativa');
        }
        return city;
    }

    static async getAll() {
        return await CityRepository.getAll();
    }
}
