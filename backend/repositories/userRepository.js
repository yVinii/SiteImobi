const User  = require('../models/User');

module.exports = class UserRepository {
    static async createUser(userData) {
        return await User.create(userData);
    }

    static async findByEmail(email) {
        return await User.findOne({ where: { email: email.trim().toLowerCase() } });
    }

    static async findById(id) {
        return await User.findByPk(id);
    }

    static async updateById(id, userData) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');

        Object.assign(user, userData);
        return await user.save();
    }
};
