const NeighborhoodRepository = require('../repositories/NeighborhoodRepository');

class NeighborhoodService {
  static async create(name, cityId) {
    return await NeighborhoodRepository.create(name, cityId);
  }

  static async getAll() {
    return await NeighborhoodRepository.getAll();
  }

  static async getById(id) {
    return await NeighborhoodRepository.getById(id);
  }
}

module.exports = NeighborhoodService;
