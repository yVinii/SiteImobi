const Properties = require("../models/Properties");
const sequelize = require('../db/conn');

module.exports = class PropertiesRepository {
    static async create(propertyData) {
        return await Properties.create(propertyData);
    }

    static async getById(id) {
        try {
            const query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.id = :id 
            AND prop.active = true;
            `;
            const properties = await sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            });
            return properties;
        } catch (error) {
            console.error('Erro ao buscar propriedade por ID:', error);
            throw new Error('Erro interno do servidor');
        }
    }    

    static async getAll() {
        const query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.active = true
            ORDER BY prop.createdAt;
        `;
        const properties = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        return properties;
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
            const query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.idBroker = :idBroker 
            AND prop.active = true;
            `;

            const properties = await sequelize.query(query, {
                replacements: { idBroker },
                type: sequelize.QueryTypes.SELECT
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades do corretor');
        }
    }

    static async getAllCityProperties(idCity) {
        try {
            const query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.idCity = :idCity 
            AND prop.active = true;
            `;
            const properties = await sequelize.query(query ,{
                replacements: { idCity },
                type: sequelize.QueryTypes.SELECT
            });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getAllTypeProperties(idPropertyType) {
        try {
                const query = `
                SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
                FROM Properties AS prop
                INNER JOIN cities AS cit ON prop.idCity = cit.id
                INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
                INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
                WHERE prop.idPropertyType = :idPropertyType 
                AND prop.active = true;
                `;
                const properties = await sequelize.query(query, {
                    replacements: { idPropertyType },
                    type: sequelize.QueryTypes.SELECT
                });
            return properties;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao obter propriedades por tipo'+error.message);
        }
    }

    static async getByTypeOfSale(typeofsale) {
        try {
            const query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.typeofsale = :typeofsale 
            AND prop.active = true;
            `;
            const properties = await sequelize.query(query, {
                replacements: { typeofsale },
                type: sequelize.QueryTypes.SELECT
            });
    
            return properties;
        } catch (error) {
            console.error('Erro ao buscar propriedades por tipo de venda:', error);
            throw new Error('Erro interno do servidor');
        }
    }

    static async countActive() {
        return await Properties.count({ where: { active: true } });
    }

    static async countCityProperties(idCity) {
        try {
            const count = await Properties.count({
                where: {
                    idCity: idCity,
                    active: true
                }
            });
            return count;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao contar propriedades na cidade');
        }
    }

    static async countTypeProperties(idPropertyType) {
        try {
            const count = await Properties.count({
                where: {
                    idPropertyType: idPropertyType,
                    active: true
                }
            });
            return count;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async countTypeOfSaleProperties(typeofsale) {
        try {
            const query = `
                SELECT COUNT(*) as count
                FROM Properties 
                WHERE typeofsale = :typeofsale 
                AND active = true;
            `;
            
            const count = await sequelize.query(query, {
                replacements: { typeofsale },
                type: sequelize.QueryTypes.SELECT
            });
    
            return count[0].count;
        } catch (error) {
            console.error('Erro ao contar propriedades por tipo de venda:', error);
            throw new Error('Erro interno do servidor');
        }
    }

    static async getPropertiesByFiltroRepository(filtros) {
        try {
            let query = `
            SELECT prop.*, cit.name as City, pt.name as TypeProperty, bk.*
            FROM Properties AS prop
            INNER JOIN cities AS cit ON prop.idCity = cit.id
            INNER JOIN propertytypes AS pt ON  prop.idPropertyType = pt.id
            INNER JOIN brokers AS bk ON prop.idBroker = bk.id 
            WHERE prop.active = true
        `;
            const replacements = {}; 
    
            if (filtros.cityId) {
                query += ' AND prop.idCity = :cityId';
                replacements.cityId = filtros.cityId;
            }
            if (filtros.bairro) {
                query += ' AND prop.neighborhood LIKE :bairro';
                replacements.bairro = '%' + filtros.bairro + '%';
            }
            if (filtros.tipoNegociacao) {
                query += ' AND prop.typeofsale = :tipoNegociacao';
                replacements.tipoNegociacao = filtros.tipoNegociacao;
            }
            if (filtros.quartos) {
                query += ' AND prop.nbedrooms = :quartos';
                replacements.quartos = filtros.quartos;
            }
            if (filtros.valor) {
                query += ' AND prop.value < :valor';
                replacements.valor = filtros.valor;
            }
    
            const properties = await sequelize.query(query, {
                replacements: replacements,
                type: sequelize.QueryTypes.SELECT
            });
    
            return properties;
        } catch (error) {
            console.error('Erro ao buscar propriedades por filtros na repository:', error);
            throw new Error(error.message);
        }
    }

    static async countGetPropertiesByFiltros(filtros) {
        try {
            let query = 'SELECT COUNT(*) as count FROM Properties WHERE active = true';
            const replacements = {};
    
            if (filtros.cityId) {
                query += ' AND idCity = :cityId';
                replacements.cityId = filtros.cityId;
            }
            if (filtros.bairro) {
                query += ' AND neighborhood LIKE :bairro';
                replacements.bairro = '%' + filtros.bairro + '%'; 
            }
            if (filtros.tipoNegociacao) {
                query += ' AND typeofsale = :tipoNegociacao';
                replacements.tipoNegociacao = filtros.tipoNegociacao;
            }
            if (filtros.quartos) {
                query += ' AND nbedrooms = :quartos';
                replacements.quartos = filtros.quartos;
            }
            if (filtros.valor) {
                query += ' AND value < :valor';
                replacements.valor = filtros.valor;
            }

            const countResult = await sequelize.query(query, {
                replacements: replacements,
                type: sequelize.QueryTypes.SELECT
            });
    
            return countResult[0].count;
        } catch (error) {
            console.error('Erro ao buscar a contagem de propriedades por filtros na repository:', error);
            throw new Error('Erro interno do servidor');
        }
    }
    
    
}
    
