const PropertiesService = require('../services/PropertiesService');
const BrokerService = require('../services/brokerService');
const CityService = require('../services/cityService');
const PropertyTypeService = require('../services/propertyTypeService');

module.exports = class PropertiesController {
    static async create(req, res) {
        try {
            const property = await PropertiesService.create(req.body);
            res.status(201).json({ message: 'Propriedade cadastrada com sucesso', property });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getPropertiesById(req, res) {
        try {
            const property = await PropertiesService.getById(req.params.id);
            res.status(200).json({ property });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const { limit, offset } = req.query;
            const { properties, pagination } = await PropertiesService.getAll(limit, offset);
            res.status(200).json({ properties, pagination });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateProperty(req, res) {
            const id = req.params.id;
            const newData = req.body;
            const images = req.files;
    
            try {
                const result = await PropertiesService.updateProperty(id, newData, images);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
    }

    static async removePropertiesById(req, res) {
        try {
            await PropertiesService.removeById(req.params.id);
            res.status(200).json({ message: 'Propriedade marcada como inativa com sucesso!' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async getUniqueNeighborhoods(req, res) {
        try {
            const uniqueNeighborhoods = await PropertiesService.getUniqueNeighborhoods();
            res.json({ neighborhoods: uniqueNeighborhoods });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAllBrokerProperties(req, res) {
        try {
            // Recebendo o id do corretor
            const idBroker = req.params.id;

            // Verificando se o corretor com esse ID existe
            const broker = await BrokerService.getById(idBroker);
            if (!broker) {
                return res.status(404).json({ message: 'Corretor não encontrado' });
            }

            // Obtendo todas as propriedades associadas a este corretor
            const properties = await PropertiesService.getAllBrokerProperties(idBroker);

            // Verificando se há propriedades associadas a este corretor
            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada para este corretor' });
            }

            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }

    }

    static async getAllCityProperties(req, res) {
        try {
            // Recebendo o id da cidade
            const idCity = req.params.id;

            // Verificando se a cidade com esse ID existe
            const city = await CityService.getCityById(idCity);
            if (!city) {
                return res.status(404).json({ message: 'Cidade não encontrada' });
            }

            // Obtendo todas as propriedades associadas a esta cidade
            const properties = await PropertiesService.getAllCityProperties(idCity);

            // Verificando se há propriedades associadas a esta cidade
            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada nessa cidade' });
            }

            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async getAllTypeProperties(req, res) {
        try {
            // Recebendo o id do tipo de propriedade
            const idPropertyType = req.params.id;

            // Verificando se o tipo de propriedade com esse ID existe
            const propertyType = await PropertyTypeService.getTypeById(idPropertyType);
            if (!propertyType) {
                return res.status(404).json({ message: 'Tipo de propriedade não encontrado' });
            }

            // Obtendo todas as propriedades do tipo selecionado
            const properties = await PropertiesService.getAllTypeProperties(idPropertyType);

            // Verificando se há propriedades do tipo selecionado
            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada' });
            }

            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async getByTypeOfSale(req, res) {
        try {
            const { typeofsale } = req.query;

            // Verificando se o tipo de venda foi fornecido
            if (!typeofsale) {
                return res.status(400).json({ message: 'O tipo de venda é obrigatório' });
            }

            // Obtendo propriedades pelo tipo de venda
            const properties = await PropertiesService.getByTypeOfSale(typeofsale);

            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }



}
