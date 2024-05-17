const ClienteRepository = require("../repositories/clienteRepository");
const clienteSchema = require("../schemas/clienteSchema");

module.exports = class ClienteService {
  static async create(clienteData) {
    const { error } = clienteSchema.validate(clienteData, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(error.details.map((detail) => detail.message).join(", "));
    }
    clienteData.phone = parseInt(clienteData.phone, 10);
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
