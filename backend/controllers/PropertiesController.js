const getUserByToken = require("../helpers/get-user-by-token")
const getToken = require("../helpers/get-token")
const Properties = require("../models/Properties")
const Broker = require('../models/Broker');

module.exports = class PropertiesController {
    //create a property
    static async create(req, res){

        const { typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register} = req.body
        const active = true

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

        //create a property
        const property = new Properties({
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
            propertyImages: {
                propertyImages: []
            },
             broker: {
                _id: broker._id,
                name: broker.name,
                phone: broker.phone,
                email: broker.email,
            },
        })
        
        try{
            const newProperty = await property.save()
            res.status(201).json({
                message: 'Propriedade cadastrada com Sucesso',
                newProperty,
            })

        } catch(error){

            res.status(500).json({message: error})
        }
    }

    /* Filtrando por Bairro
    static async getByNeighborhood(req, res) {
        const { neighborhood } = req.query;
        const properties = await Properties.findAll({
            where: {
                neighborhood: neighborhood,
            },
        });
        res.json(properties);
    }

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
