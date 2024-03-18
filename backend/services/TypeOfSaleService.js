const TypeOfSaleRepository = require('../repositories/TypeOfSaleRepository');

class TypeOfSaleService {
  static async create(name) {
    return await TypeOfSaleRepository.create(name);
  }

  static async getAll() {
    return await TypeOfSaleRepository.getAll();
  }

  static async getById(id) {
    return await TypeOfSaleRepository.getById(id);
  }
}

module.exports = TypeOfSaleService;
