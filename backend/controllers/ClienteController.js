const ClienteService = require("../services/clienteService");

module.exports = class ClienteController {
  static async create(req, res) {
    try {
      const client = await ClienteService.create(req.body);
      res
        .status(200)
        .json({ message: "Cliente cadastrado com sucesso!", client });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const client = await ClienteService.getById(req.params.id);
      res.status(200).json({ client });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const clients = await ClienteService.getAll();
      res.status(200).json({ clients });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ClienteService.delete(req.params.id);
      res.status(200).json({ message: "Cliente excluido com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
