const Broker = require('../models/Broker');

module.exports = class BrokerRepository {

    static async findByEmail(email) {
        return await Broker.findOne({ where: { email: email.trim().toLowerCase() } });
    }

    static async createBroker(data) {
        return await Broker.create(data);
    }

    static async getById(id) {
        return await Broker.findOne({
            where: { id, active: true }
        });
    }

    static async getAll() {
        return await Broker.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']]
        });
    }

    static async update(id, updateData) {
        const broker = await Broker.findOne({ where: { id } });
        await broker.update(updateData);
    }

    static async delete(id) {
        const broker = await Broker.findOne({ where: { id } });
        broker.active = false;
        await broker.save();
    }
}
