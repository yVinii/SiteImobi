const CityService = require('../services/cityService');

module.exports = class CityController {
    static async create(req, res) {
        try {
            const city = await CityService.create(req.body);
            res.status(201).json({ message: 'Cidade cadastrada com sucesso', city });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getCityById(req, res) {
        try {
            const city = await CityService.getById(req.params.id);
            res.status(200).json({ city });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const cities = await CityService.getAll();
            res.status(200).json({ cities });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
