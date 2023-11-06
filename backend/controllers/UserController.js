// Importação dos módulos necessários
const createUserToken = require('../helpers/create-user-token');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importação dos helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

// Exportação da classe UserController
module.exports = class UserController {

    // Função para registrar um novo usuário
    static async register(req, res) {
        const { email, name, phone, password, confirmpassword } = req.body;
        const active = true;

        // Validação dos campos obrigatórios
        if (!name || !email || !phone || !password || !confirmpassword || password !== confirmpassword) {
            res.status(422).json({ message: 'Por favor, preencha todos os campos obrigatórios corretamente.' });
            return;
        }

        // Verifica se o usuário já existe no banco de dados
        const userExists = await User.findOne({ where: { email: email.trim().toLowerCase() } });
        if (userExists) {
            res.status(422).json({ message: 'Este email já está sendo utilizado, por favor, escolha outro.' });
            return;
        }

        // Criação do hash da senha e criação do usuário
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ name, email, phone, password: passwordHash, active });

        try {
            const newUser = await user.save(); // Salva o novo usuário no banco de dados
            await createUserToken(newUser, req, res); // Cria um token de autenticação para o novo usuário
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar o usuário.' });
        }
    }

    // Função para autenticar o login do usuário
    static async login(req, res) {
        const { email, password } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !password) {
            res.status(422).json({ message: 'Por favor, preencha todos os campos obrigatórios corretamente.' });
            return;
        }

        // Verifica se o usuário está cadastrado
        const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });
        if (!user) {
            res.status(422).json({ message: 'Usuário não cadastrado, por favor, verifique os dados e tente novamente.' });
            return;
        }

        // Verifica se a senha informada corresponde à senha no banco de dados
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(422).json({ message: 'Senha incorreta, por favor, verifique os dados e tente novamente.' });
            return;
        }

        // Se o login for bem-sucedido, cria um token de autenticação para o usuário
        await createUserToken(user, req, res);
        return res.status(200).json({ success: true, message: 'Login bem-sucedido!' });
    }

    // Função para verificar o usuário através do token
    static async checkUser(req, res) {
        let currentUser;

        // Verifica se existe um token de autorização
        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');
            currentUser = await User.findByPk(decoded.id);
            currentUser.password = undefined; // Remove a senha do usuário para a resposta
        } else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    }

    // Função para obter um usuário pelo ID
    static async getUserById(req, res) {
        const id = req.params.id;

        try {
            const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
            if (!user) {
                res.status(422).json({ message: 'Usuário não encontrado, por favor, verifique os dados e tente novamente.' });
                return;
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }
    }

    // Função para atualizar informações do usuário
    static async editUser(req, res) {
        const id = req.params.id;
        const token = getToken(req);
        const user = await getUserByToken(token);

        const { name, email, phone, password, confirmpassword } = req.body;

        // Validação dos campos obrigatórios
        if (!name || !email || !phone) {
            res.status(422).json({ message: 'Por favor, preencha todos os campos obrigatórios corretamente.' });
            return;
        }

        // Verifica se o email já está em uso por outro usuário
        const userExist = await User.findOne({ where: { email: email } });
        if (user.email !== email && userExist) {
            res.status(422).json({ message: 'Por favor, utilize outro email.' });
            return;
        }

        // Atualiza os dados do usuário
        user.email = email;
        user.phone = phone;

        if (password === confirmpassword && password !== null) {
            // Criando uma nova senha
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        try {
            await user.save(); // Salva as alterações no banco de dados
            res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        }
    }
};
