const getUserByToken = require("../helpers/get-user-by-token");
const getToken = require("../helpers/get-token");
const Properties = require("../models/Properties");
const Broker = require('../models/Broker');

module.exports = class PropertiesController {
    /**
     * Cria uma propriedade.
     */
    static async create(req, res) {
        // Extrai os dados da requisição
        const { title, typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register } = req.body;

        // Ativa a propriedade por padrão
        const active = true;

        // Recebe as URLs das imagens do array de arquivos carregados
        const images = req.files.map(file => file.filename);

        // Validações dos campos obrigatórios
        if (!title || !typeofsale || !address || !city || !neighborhood || !value || !nbedrooms || !propertytype || !buildm2 || !groundm2 || !description || !nsuites || !nvacancies || !nbathrooms || !register) {
            return res.status(422).json({ message: "Preencha todos os campos obrigatórios!" });
        }

        // Encontra o corretor pelo ID
        const brokerId = "1";
        const broker = await Broker.findByPk(brokerId);

        if (!broker) {
            return res.status(404).json({ message: 'Corretor não encontrado' });
        }

        // Verifica se imagens foram carregadas
        if (images.length === 0) {
            return res.status(422).json({ message: 'É obrigatório carregar ao menos uma imagem!' });
        }

        // Cria a propriedade associada ao corretor
        const newProperty = await broker.createProperty({
            title,
            typeofsale,
            address,
            city,
            neighborhood,
            value,
            active,
            nbedrooms,
            propertytype,
            buildm2,
            groundm2,
            description,
            nsuites,
            nvacancies,
            nbathrooms,
            register,
            images,
        });

        try {
            res.status(201).json({
                message: 'Propriedade cadastrada com sucesso',
                newProperty,
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar a propriedade', error });
        }
    }

    /**
     * Obtém todas as propriedades ativas ordenadas por data de criação.
     */
    static async getAll(req, res) {
        try {
            const properties = await Properties.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                properties,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Obtém uma propriedade detalhada com base no ID.
     */
    static async getPropertiesById(req, res) {
        const id = req.params.id;

        try {
            const property = await Properties.findOne({
                where: { id, active: true },
            });

            if (!property) {
                return res.status(404).json({ message: 'Propriedade não encontrada ou inativa' });
            }

            res.status(200).json({ property });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Desativa uma propriedade com base no ID.
     */
    static async removePropertiesById(req, res) {
        const id = req.params.id;

        try {
            const property = await Properties.findByPk(id);

            if (!property) {
                return res.status(404).json({ message: 'Propriedade não encontrada' });
            }

            property.active = false;

            await property.save();

            res.status(200).json({ message: 'Propriedade marcada como inativa com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Atualiza uma propriedade com base no ID.
     */
    static async updateProperty(req, res) {
        const id = req.params.id;
        const { title, typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register } = req.body;
        const imagesFiles = req.files;

        try {
            const property = await Properties.findOne({
                where: { id, active: true },
            });

            if (!property) {
                return res.status(404).json({ message: 'Propriedade não encontrada ou inativa' });
            }

            // Validação dos campos obrigatórios
            if (!title || !typeofsale || !address || !city || !neighborhood || !value || !nbedrooms || !propertytype || !buildm2 || !groundm2 || !description || !nsuites || !nvacancies || !nbathrooms || !register) {
                return res.status(422).json({ message: "Preencha todos os campos obrigatórios!" });
            }

            // Atualiza os dados da propriedade
            const updateData = {
                title,
                typeofsale,
                address,
                city,
                neighborhood,
                value,
                nbedrooms,
                propertytype,
                buildm2,
                groundm2,
                description,
                nsuites,
                nvacancies,
                nbathrooms,
                register,
            };

            // Atualiza a propriedade no banco de dados
            await property.update(updateData);

            res.status(200).json({
                message: 'Propriedade atualizada com sucesso!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Obtém todos os bairros únicos das propriedades.
     */
    static async getUniqueNeighborhoods(req, res) {
        try {
            const neighborhoods = await Properties.findAll({
                attributes: ['neighborhood'],
                group: ['neighborhood'],
                raw: true,
            });

            const uniqueNeighborhoods = neighborhoods.map(property => property.neighborhood);

            res.json({ neighborhoods: uniqueNeighborhoods });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Obtém todas as cidades únicas das propriedades.
     */
    static async getUniqueCity(req, res) {
        try {
            const city = await Properties.findAll({
                attributes: ['city'],
                group: ['city'],
                raw: true,
            });

            const uniqueCity = city.map(property => property.city);

            res.json({ city: uniqueCity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    /**
     * Filtra propriedades por tipo de venda.
     */
    static async getByTypeOfSale(req, res) {
        const { typeofsale } = req.query;

        try {
            const properties = await Properties.findAll({
                where: { typeofsale },
            });

            res.json(properties);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }
    
    /**
     * Obtém propriedades associadas a um corretor específico.
     */
    static async getAllBrokerProperties(req, res) {
        try {
            const idBroker = req.params.id;
            const broker = await Broker.findByPk(idBroker);

            if (!broker) {
                return res.status(404).json({ message: 'Corretor não encontrado' });
            }

            const properties = await Properties.findAll({
                where: { idBroker: broker.id },
            });

            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'Nenhuma propriedade encontrada para este corretor' });
            }

            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }}

    // Exporta as funções do controlador de propriedades
    module.exports = PropertiesController;
