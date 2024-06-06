const BrokerRepository = require("../repositories/brokerRepository");
const PropertiesRepository = require("../repositories/PropertiesRepository");
module.exports = class BrokerService {
  static async createBroker(data) {
    const { name, email, phone, creci } = data;
    if (!name || !email || !phone || !creci) {
      throw new Error("Todos os campos são obrigatórios");
    }
    const brokerExist = await BrokerRepository.findByEmail(email);
    if (brokerExist) {
      throw new Error("Por favor, utilize outro email");
    }
    await BrokerRepository.createBroker({
      name,
      email,
      phone,
      creci,
      active: true,
    });
  }

  static async getById(id) {
    const brokerExist = await BrokerRepository.getById(id);
    if (!brokerExist) {
      throw new Error("Corretor não cadastrado ou inativo");
    }
    return brokerExist;
  }

  static async getAll() {
    return await BrokerRepository.getAll();
  }

  static async update(id, data) {
    const { name, email, phone, creci } = data;
    if (!name || !email || !phone || !creci) {
      throw new Error("Todos os campos são obrigatórios");
    }
    const brokerExist = await BrokerRepository.findByEmail(email);
    if (brokerExist) {
      throw new Error("Por favor, utilize outro email");
    }

    let updateData = {};
    //validations

    if (!name) {
      throw new Error("o nome é obrigatório");
    } else {
      updateData.name = name;
    }

    if (!email) {
      throw new Error("o email é obrigatório");
    } else {
      updateData.email = email;
    }

    if (!phone) {
      throw new Error("o phone é obrigatório");
    } else {
      updateData.phone = phone;
    }

    if (!creci) {
      throw new Error("o creci é obrigatório");
    } else {
      updateData.creci = creci;
    }
    // Update data object
    updateData = {
      name,
      email,
      phone,
      creci,
    };
    return await BrokerRepository.update(id, updateData);
  }

  static async delete(id) {
    const brokerExist = await BrokerRepository.getById(id);
    const properties = await PropertiesRepository.getAllBrokerProperties(id);

    if (!brokerExist) {
      throw new Error("Corretor não pode ser excluido");
    }
    if (properties.length > 0) {
      throw new Error(
        "Corretor não pode ser excluido, Propriedades vinculadas"
      );
    }
    return await BrokerRepository.delete(id);
  }
};
