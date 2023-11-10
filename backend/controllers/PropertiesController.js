const getUserByToken = require("../helpers/get-user-by-token")
const getToken = require("../helpers/get-token")
const Properties = require("../models/Properties")
const Broker = require('../models/Broker');

module.exports = class PropertiesController {
    //create a property
    static async create(req, res){

        const {title, typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register, owner, ownerPhone, brokerId} = req.body
        const active = true
        // Recebendo as URLs das imagens do array de arquivos carregados
       const images = req.files.map(file => file.filename);

        //image upload

        //validations
        if(!title){
            res.status(422).json({message: "O titulo do imóvel é obrigatório"})
            return
        }

        if(!typeofsale){
            res.status(422).json({message: "O tipo de venda do imóvel é obrigatório"})
            return
        }

        if(!address){
            res.status(422).json({message: "O Endereço do imóvel é obrigatório"})
            return
        }

        if(!city){
            res.status(422).json({message: "A cidade do imóvel é obrigatório"})
            return
        }

        if(!neighborhood){
            res.status(422).json({message: "O Bairro do imóvel é obrigatório"})
            return
        }

        if(!value){
            res.status(422).json({message: "O Valor do imóvel é obrigatório"})
            return
        }

        if(!nbedrooms){
            res.status(422).json({message: "O número de quartos do imóvel é obrigatório"})
            return
        }

        if(!propertytype){
            res.status(422).json({message: "O tipo do imóvel é obrigatório"})
            return
        }

        if(!buildm2){
            res.status(422).json({message: "O tamanho construído do imóvel é obrigatório"})
            return
        }

        if(!groundm2){
            res.status(422).json({message: "O tamanho do terreno do imóvel é obrigatório"})
            return
        }

        if(!description){
            res.status(422).json({message: "A descrição do imóvel é obrigatório"})
            return
        }

        if(!nsuites){
            res.status(422).json({message: "O número de suites do imóvel é obrigatório"})
            return
        }

        if(!nvacancies){
            res.status(422).json({message: "O número de vagas do imóvel é obrigatório"})
            return
        }

        if(!nbathrooms){
            res.status(422).json({message: "O número de banheiros do imóvel é obrigatório"})
            return
        }

        if(!register){
            res.status(422).json({message: "O número do imóvel é obrigatório"})
            return
        }
        
        if(!owner){
            res.status(422).json({message: "O nome do Proprietário do imóvel é obrigatório"})
            return
        }

        if(!ownerPhone){
            res.status(422).json({message: "O Telefone do Proprietário do imóvel é obrigatório"})
            return
        }
        
         // Verificando se o corretor com esse ID existe
         const broker = await Broker.findByPk(brokerId);

         // Verificando se o corretor foi encontrado
         if (!broker) {
                 return res.status(404).json({ message: 'Corretor não encontrado' });
             }
      
        if(images.length === 0){
            return res.status(422).json({message: 'A imagem é obrigatória!'})
        }
        //create a property
        const newProperty= await broker.createProperty({
            title,
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
            owner,
            ownerPhone,
            images,
            broker,
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
    
    // UPDATE EM PROPRIEDADE
    static async updateProperty(req, res){
        const id = req.params.id
        const {title, typeofsale, address, city, neighborhood, value, nbedrooms, propertytype, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register, owner, ownerphone, brokerId} = req.body
        const imagesFiles = req.files

        try{
        //check if property exists
       
         const property = await Properties.findOne({
            where: { id, active: true }, // Adicionando a condição para propriedades ativas
        });
        if (!property) {
            return res.status(404).json({ message: 'Propriedade não cadastrada ou inativa' });
        }

        let updateData = {};

        //validations
        if(!title){
            res.status(422).json({message: "O titulo do imóvel é obrigatório"})
            return
        }

        if(!typeofsale){
            res.status(422).json({message: "O tipo de venda do imóvel é obrigatório"})
            return
        }else {
            updateData.typeofsale = typeofsale
        }

        if(!address){
            res.status(422).json({message: "O Endereço do imóvel é obrigatório"})
            return
        }else {
            updateData.address = address
        }

        if(!city){
            res.status(422).json({message: "A cidade do imóvel é obrigatório"})
            return
        }else {
            updateData.city = city
        }

        if(!neighborhood){
            res.status(422).json({message: "O Bairro do imóvel é obrigatório"})
            return
        }else {
            updateData.neighborhood = neighborhood
        }

        if(!value){
            res.status(422).json({message: "O Valor do imóvel é obrigatório"})
            return
        }else {
            updateData.value = value
        }

        if(!nbedrooms){
            res.status(422).json({message: "O número de quartos do imóvel é obrigatório"})
            return
        }else {
            updateData.nbedrooms = nbedrooms
        }

        if(!propertytype){
            res.status(422).json({message: "O tipo do imóvel é obrigatório"})
            return
        }else {
            updateData.propertytype = propertytype
        }

        if(!buildm2){
            res.status(422).json({message: "O tamanho construído do imóvel é obrigatório"})
            return
        }else {
            updateData.buildm2 = buildm2
        }

        if(!groundm2){
            res.status(422).json({message: "O tamanho do terreno do imóvel é obrigatório"})
            return
        }else {
            updateData.groundm2 = groundm2
        }

        if(!description){
            res.status(422).json({message: "A descrição do imóvel é obrigatório"})
            return
        }else {
            updateData.description = description
        }

        if(!nsuites){
            res.status(422).json({message: "O número de suites do imóvel é obrigatório"})
            return
        }else {
            updateData.nsuites = nsuites
        }

        if(!nvacancies){
            res.status(422).json({message: "O número de vagas do imóvel é obrigatório"})
            return
        }else {
            updateData.nvacancies = nvacancies
        }

        if(!nbathrooms){
            res.status(422).json({message: "O número de banheiros do imóvel é obrigatório"})
            return
        }else {
            updateData.nbathrooms = nbathrooms
        }

        if(!register){
            res.status(422).json({message: "O número do imóvel é obrigatório"})
            return
        }else {
            updateData.register = register
        }

        if(!ownerphone){
            res.status(422).json({message: "O Telefone do Proprietário do imóvel é obrigatório"})
            return
        }else {
            updateData.typeofsale = typeofsale
        }

        if(!owner){
            res.status(422).json({message: "O Proprietário do imóvel é obrigatório"})
            return
        }else {
            updateData.owner = owner
        }
          // Verificando se o corretor com esse ID existe
          const broker = await Broker.findByPk(brokerId);

          // Verificando se o corretor foi encontrado
          if (!broker) {
                  return res.status(404).json({ message: 'Corretor não encontrado' });
              } else {
                updateData.broker = broker
              }

         // Update data object
          updateData = {
            title,
            typeofsale,
            address,
            city,
            neighborhood,
            value,
            nbedrooms,
            propertytype,
            buildm2,
            groundm2,
            description,
            nsuites,
            owner,
            ownerphone,
            nvacancies,
            nbathrooms,
            register,
            broker,
        };
       
        if (imagesFiles.length === 0) {
                return res.status(422).json({ message: 'A imagem é obrigatória!' });
        } else {
                // Mapeia os nomes dos arquivos das imagens e adiciona ao array images
                const images = req.files.map(file => file.filename);
            
                // Adiciona as novas imagens ao array existente em updateData.images
                updateData.images = images;
        }
        
         // Atualizando a propriedade com os novos dados
         await property.update(updateData);

         res.status(200).json({
             message: 'Propriedade atualizada com sucesso!',
         });
        } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Erro interno do servidor' });
     }}
      


// Método para obter todos os bairros únicos
 static async getUniqueNeighborhoods(req, res) {
    try {
        const neighborhoods = await Properties.findAll({
            attributes: ['neighborhood'], // Seleciona apenas a coluna neighborhood
            group: ['neighborhood'], // Agrupa pelos diferentes bairros
            raw: true, // Retorna apenas os dados brutos, sem instâncias do modelo
        });

        const uniqueNeighborhoods = neighborhoods.map(property => property.neighborhood);

        res.json({ neighborhoods: uniqueNeighborhoods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}





//Filtrando por Corretor
static async getAllBrokerProperties(req, res) {
    try {
        // Recebendo o id do corretor
        const idBroker = req.params.id;

        // Verificando se o corretor com esse ID existe
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

        
        // Verificando se há propriedades associadas a este corretor
        if (!properties || properties.length === 0) {
            return res.status(404).json({ message: 'Nenhuma propriedade encontrada para este corretor' });
        }

        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}



  // Método para obter todas cidades
 static async getUniqueCity(req, res) {
    try {
        const city = await Properties.findAll({
            attributes: ['city'], // Seleciona apenas a coluna da cidade
            group: ['city'], // Agrupa por diferentes cidades
            raw: true, // Retorna apenas os dados brutos, sem instâncias do modelo
        });

        const uniqueCity = city.map(property => property.city);

        res.json({ city: uniqueCity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
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

