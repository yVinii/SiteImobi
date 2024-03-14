const BrokerService = require('../services/brokerService');

module.exports = class BrokerController {

  static async create(req, res){
    try {
        await BrokerService.createBroker(req.body);
        res.status(201).json({ message: 'Corretor cadastrado com Sucesso' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   }

    static async getById(req, res) {
        try {
            const brokerId = req.params.id;
            const broker = await BrokerService.getById(brokerId);
            res.status(200).json({ broker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const brokers = await BrokerService.getAll();
            res.status(200).json({ brokers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const brokerId = req.params.id;
            const updatedBrokerData = req.body;
            await BrokerService.update(brokerId, updatedBrokerData);
            res.status(200).json({ message: 'Corretor atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message});
        }
    }

    static async delete(req, res) {
        try {
            const brokerId = req.params.id;
            await BrokerService.delete(brokerId);
            res.status(200).json({ message: 'Corretor marcado como inativo com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message});
        }
    }
}
