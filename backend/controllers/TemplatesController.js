const Templates = require('../models/Templates');

module.exports = class TemplatesController {
    //create a template
    static async create(req, res){

        const {owner, emailOwner, phone, city, propertytype, description, typeofsale} = req.body
        const active = true
        // Recebendo as URLs das imagens do array de arquivos carregados
       const images = req.files.map(file => file.filename);

        //image upload

        //validations
        if(!owner){
            res.status(422).json({message: "O nome do proprietário do do imóvel é obrigadório"})
            return
        }

        if(!emailOwner){
            res.status(422).json({message: "O email do proprietário do do imóvel é obrigadório"})
            return
        }


        if(!typeofsale){
            res.status(422).json({message: "O tipo de venda do imóvel é obrigadório"})
            return
        }


        if(!city){
            res.status(422).json({message: "A cidade do imóvel é obrigadório"})
            return
        }

        if(!propertytype){
            res.status(422).json({message: "O tipo do imóvel é obrigadório"})
            return
        }

        if(!description){
            res.status(422).json({message: "A descrição do imóvel é obrigadório"})
            return
        }


        if(!phone){
            res.status(422).json({message: "O número de telefone é obrigadório"})
            return
        }
       

        if(images.length === 0){
            return res.status(422).json({message: 'A imagem é obrigatória!'})
        }
        //create a templayr
        const template = await Templates.create({
            owner,
            emailOwner,
            typeofsale, 
            city, 
            active: true,
            propertytype,
            description,  
            phone,
            images,
        });
        
        try{
            res.status(201).json({
                message: 'Template cadastrado com Sucesso',
                newTemplate: template,
            });

        } catch(error){

            res.status(500).json({message: error})
        }
    }

    // TRAZ TODOS TEEMPLATES
    static async getAll(req, res) {
        try {
            const templates = await Templates.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']] // Ordenar por createdAt em ordem decrescente
            });
    
            res.status(200).json({
                Templates: templates,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // RECEBE UM ID E TRAZ UM TEMPLATE DETALHADO
    static async getTemplateById(req, res) {
        const id = req.params.id;
    
        try {
            
            const template = await Templates.findOne({
                where: { id, active: true }, // Adicionando a condição para templates ativos
            });
    
            if (!template) {
                return res.status(404).json({ message: 'Template não cadastrado ou inativo' });
            }
    
            // Se o template for encontrado e ativo, responder com os dados do emplate
            res.status(200).json({ template });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    
    // EXCLUI UM TEMPLATE
    static async removeTemplateById(req, res){
        const id = req.params.id;
    
        try {
            const template = await Templates.findByPk(id);
    
            if (!template) {
                return res.status(404).json({ message: 'Template não cadastrado' });
            }
    
            // Altera o valor da coluna 'active' para false
            template.active = false;
    
            // Salva a alteração no banco de dados
            await template.save();
    
            res.status(200).json({ message: 'Template marcado como inativo com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

}


