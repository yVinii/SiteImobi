const Cliente = require("../models/Cliente");

module.exports = class ClienteRepository {
  static async create(clienteData) {
    return await Cliente.create(clienteData);
  }

  static async getById(id) {
    try {
      return await Cliente.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAll() {
    return await Cliente.findAll();
  }

  static async delete(id) {
    return await Cliente.delete(id);
  }
};
