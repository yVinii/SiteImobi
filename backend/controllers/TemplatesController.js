const Templates = require('../models/Templates'); // Importa o modelo de Templates

module.exports = class TemplatesController {
    // Método para criar um novo template
    static async create(req, res){
        // Extrai os dados do corpo da solicitação
        const { owner, emailOwner, phone, city, propertytype, description, typeofsale } = req.body;
        const active = true; // Define o template como ativo

        // Recebe as URLs das imagens do array de arquivos carregados
        const images = req.files.map(file => file.filename);

        // Validação dos campos
        if (!owner || !emailOwner || !typeofsale || !city || !propertytype || !description || !phone) {
            res.status(422).json({ message: "Campos obrigatórios faltando" });
            return;
        }

        if (images.length === 0) {
            res.status(422).json({ message: 'Pelo menos uma imagem é obrigatória!' });
            return;
        }

        try {
            // Cria um novo template com os dados fornecidos
            const template = await Templates.create({
                owner,
                emailOwner,
                typeofsale,
                city,
                active,
                propertytype,
                description,
                phone,
                images,
            });

            // Responde com o novo template criado
            res.status(201).json({
                message: 'Template cadastrado com sucesso',
                newTemplate: template,
            });
        } catch(error) {
            // Em caso de erro, envia uma resposta com o erro ocorrido
            res.status(500).json({ message: error });
        }
    }

    // Método para obter todos os templates ativos
    static async getAll(req, res) {
        try {
            // Busca todos os templates ativos, ordenados por data de criação decrescente
            const templates = await Templates.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']]
            });
    
            // Responde com a lista de templates encontrados
            res.status(200).json({ Templates: templates });
        } catch (error) {
            // Em caso de erro, envia uma resposta com o erro ocorrido
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Método para obter um template por ID
    static async getTemplateById(req, res) {
        const id = req.params.id;

        try {
            // Busca um template ativo pelo ID fornecido
            const template = await Templates.findOne({
                where: { id, active: true }
            });

            // Verifica se o template foi encontrado
            if (!template) {
                res.status(404).json({ message: 'Template não encontrado ou inativo' });
                return;
            }

            // Responde com os detalhes do template encontrado
            res.status(200).json({ template });
        } catch (error) {
            // Em caso de erro, envia uma resposta com o erro ocorrido
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Método para remover um template por ID
    static async removeTemplateById(req, res){
        const id = req.params.id;

        try {
            // Busca um template pelo ID fornecido
            const template = await Templates.findByPk(id);

            // Verifica se o template foi encontrado
            if (!template) {
                res.status(404).json({ message: 'Template não encontrado' });
                return;
            }

            // Desativa o template (altera o campo 'active' para false)
            template.active = false;

            // Salva a alteração no banco de dados
            await template.save();

            // Responde com uma mensagem de sucesso
            res.status(200).json({ message: 'Template marcado como inativo com sucesso!' });
        } catch (error) {
            // Em caso de erro, envia uma resposta com o erro ocorrido
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}


