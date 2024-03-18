const Neighborhood = require('../models/Neighbordhood');

class NeighborhoodRepository {
  static async create(name, cityId) {
    return await Neighborhood.create({ name, cityId });
  }

  static async getAll() {
    return await Neighborhood.findAll();
  }

  static async getById(id) {
    return await Neighborhood.findByPk(id);
  }
}

module.exports = NeighborhoodRepository;
