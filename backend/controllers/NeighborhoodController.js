const NeighborhoodService = require('../services/NeighborhoodService');

class NeighborhoodController {
  static async create(req, res) {
    try {
      const { name, cityId } = req.body;
      const neighborhood = await NeighborhoodService.create(name, cityId);
      res.status(201).json({ neighborhood });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getAll(req, res) {
    try {
      const neighborhoods = await NeighborhoodService.getAll();
      res.status(200).json({ neighborhoods });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const neighborhood = await NeighborhoodService.getById(id);
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

module.exports = NeighborhoodController;
