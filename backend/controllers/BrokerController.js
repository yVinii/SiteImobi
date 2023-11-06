const Broker = require('../models/Broker');
const Properties = require('../models/Properties');

module.exports = class BrokerController {
    // Criar um Corretor
    static async create(req, res) {
        const { email, name, phone, creci } = req.body;
        const active = true;

        // Validação
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;
        }
        if (!creci) {
            res.status(422).json({ message: 'O creci do corretor é obrigatório' });
            return;
        }

        // Verificar se o corretor existe
        const brokerExist = await Broker.findOne({
            where: { email: email.trim().toLowerCase() },
        });
        if (brokerExist) {
            res.status(422).json({
                message: 'Por favor, utilize outro email!',
            });
            return;
        }

        const broker = new Broker({
            name,
            email,
            phone,
            creci,
            active: true,
        });
        try {
            const newBroker = await broker.save();
            res.status(201).json({
                message: 'Corretor cadastrado com Sucesso',
                newBroker,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Obter Corretor por ID
    static async getBrokerById(req, res) {
        const id = req.params.id;

        try {
            const broker = await Broker.findOne({
                where: { id, active: true },
            });
            if (!broker) {
                return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
            }
            res.status(200).json({ broker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Obter todos os Corretores
    static async getAll(req, res) {
        try {
            const broker = await Broker.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']],
            });
            res.status(200).json({
                broker: broker,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Editar Corretores
    static async updateBroker(req, res) {
        const id = req.params.id;
        const { email, name, phone, creci } = req.body;

        try {
            const broker = await Broker.findOne({
                where: { id, active: true },
            });
            if (!broker) {
                return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
            }

            let updateData = {};

            // Validações
            if (!name) {
                res.status(422).json({ message: 'O nome é obrigatório' });
                return;
            } else {
                updateData.name = name;
            }

            if (!email) {
                res.status(422).json({ message: 'O email é obrigatório' });
                return;
            } else {
                updateData.email = email;
            }

            if (!phone) {
                res.status(422).json({ message: 'O telefone é obrigatório' });
                return;
            } else {
                updateData.phone = phone;
            }

            if (!creci) {
                res.status(422).json({ message: 'O creci do corretor é obrigatório' });
                return;
            } else {
                updateData.creci = creci;
            }

            // Dados para atualização
            updateData = {
                name,
                email,
                phone,
                creci,
            };

            // Atualizar o corretor com os novos dados
            await broker.update(updateData);

            res.status(200).json({
                message: 'Corretor atualizado com sucesso!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Deletar Corretor
    static async deleteBrokerById(req, res) {
        const id = req.params.id;

        try {
            const broker = await Broker.findOne({
                where: { id, active: true },
            });
            if (!broker) {
                return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
            }

            const properties = await Properties.findAll({
                where: {
                    idBroker: broker.id,
                },
            });

            if (!properties || properties.length > 0) {
                return res.status(404).json({ message: 'Impossível excluir o corretor, pois há propriedades associadas a ele.' });
            } else {
                broker.active = false;
                await broker.save();
            }

            res.status(200).json({ message: 'Corretor marcado como inativo com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};
