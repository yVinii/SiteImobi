const ClienteRepository = require("../repositories/clienteRepository");

module.exports = class ClienteService {
  static async create(clienteData) {
    if (!clienteData.name) {
      throw new Error("Por favor insira um nome");
    }
    if (!clienteData.email) {
      throw new Error("Por favor insira um email valido");
    }
    if (!clienteData.phone) {
      throw new Error("Por favor insira um telefone válido");
    }
    return await ClienteRepository.create(clienteData);
  }

  static async getById(id) {
    const cliente = await ClienteRepository.getById(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  }

  static async getAll() {
    return await ClienteRepository.getAll();
  }

  static async delete(id) {
    const cliente = await ClienteRepository.delete(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  }
};
