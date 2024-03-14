const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserService {
    static async register(userData) {
        const { name, email, phone, password, confirmPassword } = userData;

        // Validação
        if (!name || !email || !phone || !password || !confirmPassword) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const userExists = await UserRepository.findByEmail(email);
        if (userExists) throw new Error('Já existe um usuário com esse email');

        if (password !== confirmPassword) throw new Error('As senhas precisam ser iguais');

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await UserRepository.createUser({
            name,
            email,
            phone,
            password: passwordHash,
            active: true,
        });

        return await createUserToken(newUser);
    }

        static async login(email, password) {
            const user = await UserRepository.findByEmail(email);
    
            if (!user) throw new Error('Usuário não encontrado');
    
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) throw new Error('Senha incorreta');
    
            const token = await createUserToken(user);
    
            return token;
        }


    static async getUserByToken(token) {
        return await UserRepository.findById(token.id);
    }

    static async getUserById(id) {
        return await UserRepository.findById(id);
    }

    static async editUser(id, userData) {
        const { email, phone, password, confirmPassword } = userData;

        // Validação
        if (!email || !phone) throw new Error('Email e telefone são obrigatórios');

        const user = await UserRepository.findById(id);
        if (!user) throw new Error('Usuário não encontrado');

        const userExists = await UserRepository.findByEmail(email);
        if (userExists && userExists.id !== id) throw new Error('Já existe um usuário com esse email');

        user.email = email;
        user.phone = phone;

        if (password && password === confirmPassword) {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        } else if (password && password !== confirmPassword) {
            throw new Error('As senhas precisam ser iguais');
        }

        return await user.save();
    }
};
