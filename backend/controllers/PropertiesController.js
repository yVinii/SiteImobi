const getUserByToken = require("../helpers/get-user-by-token")
const getToken = require("../helpers/get-token")
const Properties = require("../models/Properties")
const Broker = require('../models/Broker');

module.exports = class PropertiesController {
    //create a property
    static async create(req, res){

        const { typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register} = req.body
        const active = true
        // Obtenha as URLs das imagens do array de arquivos carregados
       const images = req.files.map(file => file.filename);

        //image upload

        //validations
        if(!typeofsale){
            res.status(422).json({message: "O tipo de venda do imóvel é obrigadório"})
            return
        }

        if(!address){
            res.status(422).json({message: "O Endereço do imóvel é obrigadório"})
            return
        }

        if(!city){
            res.status(422).json({message: "A cidade do imóvel é obrigadório"})
            return
        }

        if(!neighborhood){
            res.status(422).json({message: "O Bairro do imóvel é obrigadório"})
            return
        }

        if(!value){
            res.status(422).json({message: "O Valor do imóvel é obrigadório"})
            return
        }

        if(!nbedrooms){
            res.status(422).json({message: "O número de quartos do imóvel é obrigadório"})
            return
        }

        if(!propertytype){
            res.status(422).json({message: "O tipo do imóvel é obrigadório"})
            return
        }

        if(!buildm2){
            res.status(422).json({message: "O tamanho construído do imóvel é obrigadório"})
            return
        }

        if(!groundm2){
            res.status(422).json({message: "O tamanho do terreno do imóvel é obrigadório"})
            return
        }

        if(!description){
            res.status(422).json({message: "A descrição do imóvel é obrigadório"})
            return
        }

        if(!nsuites){
            res.status(422).json({message: "O número de suites do imóvel é obrigadório"})
            return
        }

        if(!nvacancies){
            res.status(422).json({message: "O número de vagas do imóvel é obrigadório"})
            return
        }

        if(!nbathrooms){
            res.status(422).json({message: "O número de banheiros do imóvel é obrigadório"})
            return
        }

        if(!register){
            res.status(422).json({message: "O número do imóvel é obrigadório"})
            return
        }
        const brokerId = "1";

        // Verificar se o corretor com esse ID existe
        const broker = await Broker.findByPk(brokerId);

        // Verificar se o corretor foi encontrado
        if (!broker) {
                return res.status(404).json({ message: 'Corretor não encontrado' });
            }
      
        if(images.length === 0){
            return res.status(422).json({message: 'A imagem é obrigatória!'})
        }
        //create a property
        const newProperty= await broker.createProperty({
            typeofsale, 
            address, 
            city, 
            neighborhood, 
            value,
            active: true, 
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
        })
        
        try{
            res.status(201).json({
                message: 'Propriedade cadastrada com Sucesso',
                newProperty,
            })

        } catch(error){

            res.status(500).json({message: error})
        }
    }

    // TRAZ TODAS PROPRIEDADES
    static async getAll(req, res) {
        try {
            const properties = await Properties.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']] // Ordenar por createdAt em ordem decrescente
            });
    
            res.status(200).json({
                properties: properties,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // RECEBE UM ID E TRAZ UMA PROPRIEDADE DETALHADA
    static async getPropertiesById(req, res) {
        const id = req.params.id;
    
        try {
            
            const property = await Properties.findOne({
                where: { id, active: true }, // Adicionando a condição para propriedades ativas
            });
    
            if (!property) {
                return res.status(404).json({ message: 'Propriedade não cadastrada ou inativa' });
            }
    
            // Se a propriedade for encontrada e ativa, responder com os dados da propriedade
            res.status(200).json({ property });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    
    // EXCLUI UMA PROPRIEDADE
    static async removePropertiesById(req, res){
        const id = req.params.id;
    
        try {
            const property = await Properties.findByPk(id);
    
            if (!property) {
                return res.status(404).json({ message: 'Propriedade não cadastrada' });
            }
    
            // Altera o valor da coluna 'active' para false
            property.active = false;
    
            // Salva a alteração no banco de dados
            await property.save();
    
            res.status(200).json({ message: 'Propriedade marcada como inativa com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    


    

    ///Filtrando por Bairro
    static async getByNeighborhood(req, res) {
        const { neighborhood } = req.query;
        const properties = await Properties.findAll({
            where: {
                neighborhood: neighborhood,
            },
        });
        res.json(properties);
    }
//Filtrando por Corretor
static async getAllBrokerProperties(req, res) {
    try {
        // Extraia o idBroker da requisição ou de onde você o obtém
        const idBroker = req.params.id; // Use req.params se estiver na URL

        // Verifique se o corretor com esse ID existe
        const broker = await Broker.findByPk(idBroker);

        if (!broker) {
            return res.status(404).json({ message: 'Corretor não encontrado' });
        }

        // Consulta para encontrar propriedades associadas a este corretor
        const properties = await Properties.findAll({
            where: {
                idBroker: broker.id
            }
        });

        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

/*
    // Filtrando por Cidade
    static async getByCity(req, res) {
        const { city } = req.query;
        const properties = await Properties.findAll({
            where: {
                city: city,
            },
        });
        res.json(properties);
    }

    // Filtrando por Tipo de Venda
    static async getByTypeOfSale(req, res) {
        const { typeofsale } = req.query;
        const properties = await Properties.findAll({
            where: {
                typeofsale: typeofsale,
            },
        });
        res.json(properties);
    }
}
*/
// Roteamento
//router.post('/create', PropertiesController.create);
//router.get('/byNeighborhood', PropertiesController.getByNeighborhood);
//router.get('/byCity', PropertiesController.getByCity);
//router.get('/byTypeOfSale', PropertiesController.getByTypeOfSale);

}
