const TypeOfSale = require('../models/TypeOfSale');

class TypeOfSaleRepository {
  static async create(name) {
    return await TypeOfSale.create({ name });
  }

  static async getAll() {
    return await TypeOfSale.findAll();
  }

  static async getById(id) {
    return await TypeOfSale.findByPk(id);
  }
}

module.exports = TypeOfSaleRepository;
