const UserService = require('../services/userService');

module.exports = class UserController {
    static async register(req, res) {
        try {
            const userData = req.body;
            const token = await UserService.register(userData);

            res.status(201).json({
                message: 'Usuário registrado com sucesso',
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message});
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: error.message || 'Credenciais inválidas' });
        }
    }

    static async getUser(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await UserService.getUserByToken(token);

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserService.getUserById(id);

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async editUser(req, res) {
        try {
            const id = req.params.id;
            const userData = req.body;
            await UserService.editUser(id, userData);

            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};
