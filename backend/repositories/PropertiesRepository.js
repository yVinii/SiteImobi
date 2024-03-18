const Properties = require("../models/Properties");

module.exports = class PropertiesRepository {
    static async create(propertyData) {
        return await Properties.create(propertyData);
    }

    static async getById(id) {
        return await Properties.findOne({ where: { id, active: true } });
    }

    static async getAll() {
        return await Properties.findAll({ where: { active: true }, order: [['createdAt', 'DESC']] });
    }

    static async update(id, propertyData) {
        const property = await Properties.findByPk(id);
        if (!property) {
            throw new Error('Propriedade não encontrada');
        }
        await property.update(propertyData);
        return property;
    }

    static async deleteById(id) {
        const property = await Properties.findByPk(id);
        if (!property) {
            throw new Error('Propriedade não encontrada');
        }
        property.active = false;
        await property.save();
    }

    static async getPropertiesByNeighborhood(idNeighborhood) {
        try {
            const properties = await Properties.findAll({
                where: { idNeighborhood },
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades desse Bairro');
        }
    }

    static async getAllBrokerProperties(idBroker) {
        try {
            const properties = await Properties.findAll({
                where: { idBroker },
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades do corretor');
        }
    }

    static async getAllCityProperties(idCity) {
        try {
            const properties = await Properties.findAll({
                where: { idCity },
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades da cidade');
        }
    }

    static async getAllTypeProperties(idPropertyType) {
        try {
            const properties = await Properties.findAll({
                where: { idPropertyType },
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades por tipo');
        }
    }

    static async getAllTypeOfSaleProperties(idTypeOfSale) {
        try {
            const properties = await Properties.findAll({
                where: { idTypeOfSale },
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades desse Bairro');
        }
    }

    static async findAll(options) {
        return await Properties.findAll(options);
    }

    static async countActive() {
        return await Properties.count({ where: { active: true } });
    }
}
