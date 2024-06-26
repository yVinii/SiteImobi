const PropertiesService = require('../services/PropertiesService');
const BrokerService = require('../services/brokerService');
const CityService = require('../services/cityService');
const PropertyTypeService = require('../services/propertyTypeService');

module.exports = class PropertiesController {
    static async create(req, res) {
        try {
            const propertyData = req.body;
            propertyData.images = req.files.map(file => file.filename);
            const newProperty = await PropertiesService.create(propertyData);

        
            res.status(201).json({ message: 'Propriedade cadastrada com sucesso', newProperty });
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

    static async getPropertiesByNeighborhood(req, res) {
        try {
            const { neighborhood } = req.query;
        const properties = await PropertiesService.getPropertiesByNeighborhood(neighborhood);
        res.status(200).json({ properties });
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
            const { idCity } = req.params;
            const { limit, offset } = req.query; 
           
            const city = await CityService.getById(idCity);
           if (!city) {
                return res.status(404).json({ message: 'Cidade não encontrada' });
            }
    
            const { properties, pagination } = await PropertiesService.getAllCityProperties(idCity, limit, offset);
    
            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada nessa cidade' });
            }
    
            res.status(200).json({ properties, pagination });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message :error.message });
        }
    }
    
    static async getAllTypeProperties(req, res) {
        try {
            const { idPropertyType } = req.params;
            const { limit, offset } = req.query; 
    
           const propertyType = await PropertyTypeService.getById(idPropertyType);
            if (!propertyType) {
               return res.status(404).json({ message: 'Tipo de propriedade não encontrado' });
            }
    
            const { properties, pagination } = await PropertiesService.getAllTypeProperties(idPropertyType, limit, offset);

            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada' });
            }
    
            res.status(200).json({ properties, pagination });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    
    static async getByTypeOfSale(req, res) {
        try {
           
            const { typeofsale, limit, offset } = req.query; 
            
            if (!typeofsale) {
                return res.status(400).json({ message: 'O tipo de venda é obrigatório' });
            }
            const {properties, pagination} = await PropertiesService.getByTypeOfSale(typeofsale, limit, offset);

            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada' });
            }
            res.status(200).json({ properties , pagination });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async getPropertiesByFiltro(req, res) {
        try {
            const { cityId, bairro, tipoNegociacao, quartos, valor, limit, offset } = req.query;
            const filters = {};
    
            if (cityId) filters.cityId = cityId;
            if (bairro) filters.bairro = bairro;
            if (tipoNegociacao) filters.tipoNegociacao = tipoNegociacao;
            if (quartos) filters.quartos = quartos;
            if (valor) filters.valor = valor;
    
            const { properties, pagination } = await PropertiesService.getPropertiesByFiltroService(filters, limit, offset);
            res.status(200).json({ properties, pagination });
        } catch (error) {
            console.error('Erro ao buscar propriedades por filtros:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    

}
