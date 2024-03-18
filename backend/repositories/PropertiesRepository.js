const Properties = require("../models/Properties");
const { Sequelize, Op } = require('sequelize')
const sequelize = require('../db/conn'); // Importando a conexão Sequelize

module.exports = class PropertiesRepository {
    static async create(propertyData) {
        return await Properties.create(propertyData);
    }

    static async getById(id) {
        try {
            return await Properties.findOne({ where: { id, active: true } });
        } catch (error) {
            console.error('Erro ao buscar propriedade por ID:', error);
            throw new Error('Erro interno do servidor');
        }
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

    static async getPropertiesByNeighborhood(neighborhood) {
        try {
            const query = `
                SELECT * 
                FROM Properties 
                WHERE neighborhood LIKE :neighborhood 
                AND active = true;
            `;
            
            const properties = await sequelize.query(query, {
                replacements: { neighborhood: `%${neighborhood}%` },
                type: sequelize.QueryTypes.SELECT
            });
    
            return properties;
        } catch (error) {
            console.error('Erro ao buscar propriedades por bairro:', error);
            throw new Error('Erro interno do servidor');
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

    static async getByTypeOfSale(typeofsale) {
        try {
            const query = `
                SELECT * 
                FROM Properties 
                WHERE typeofsale LIKE :typeofsale 
                AND active = true;
            `;
            
            const properties = await sequelize.query(query, {
                replacements: { typeofsale: `%${typeofsale}%` },
                type: sequelize.QueryTypes.SELECT
            });
    
            return properties;
        } catch (error) {
            console.error('Erro ao buscar propriedades por tipo de venda:', error);
            throw new Error('Erro interno do servidor');
        }
    }

    static async findAll(options) {
        return await Properties.findAll(options);
    }

    static async countActive() {
        return await Properties.count({ where: { active: true } });
    }
}
