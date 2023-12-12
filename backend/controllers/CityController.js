const City = require('../models/City')
const Properties = require('../models/Properties'); 

module.exports = class CityController {
    //create a city
    static async create(req, res){
      const {name} = req.body
       const active = true

       //validation 
       if(!name){
        res.status(422).json({ message : 'o nome é obrigatório'})
        return 
       }
      
      const city = new City({
        name,
        active:true,
      });
      try{
          const newCity = await city.save()
          res.status(201).json({
            message: 'Cidade cadastrada com Sucesso',
            newCity,
      })
      
      }catch(error){
        res.status(500).json({message: error})
      }
    }


    // GET CITY ById
    static async getCityById(req, res){
      const id = req.params.id

      try{

        const city = await City.findOne({
          where: { id, active: true }, // Adicionando a condição para Cidades ativas
        })
        if (!city) {
          return res.status(404).json({ message: 'Cidade não cadastrado ou inativo' });
        }
         // Se a cidade for encontrada e ativa, responder com os dados
         res.status(200).json({ city });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    
    }
    
    //GET TODAS CIDADES
    static async getAll(req, res){
      try {
        const city = await City.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']] // Ordenar por createdAt em ordem decrescente
        });

        res.status(200).json({
            city: city,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
    }


  }
  
