const TypeOfSaleService = require('../services/TypeOfSaleService');

class TypeOfSaleController {
  static async create(req, res) {
    try {
      const { name } = req.body;
      const typeofsale = await TypeOfSaleService.create(name);
      res.status(201).json({ typeofsale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getAll(req, res) {
    try {
      const typeofsale = await TypeOfSaleService.getAll();
      res.status(200).json({ typeofsale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const typeofsale = await TypeOfSaleService.getById(id);
      if (!neighborhood) {
        return res.status(404).json({ message: 'Bairro não encontrado' });
      }
      res.status(200).json({ neighborhood });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = TypeOfSaleController;
