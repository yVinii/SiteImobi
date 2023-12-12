const PropertyType = require('../models/PropertyType')
const Properties = require('../models/Properties'); 

module.exports = class PropertyTypeController {
    //create o tipo de propriedade
    static async create(req, res){
      const {name} = req.body
       const active = true

       //validation 
       if(!name){
        res.status(422).json({ message : 'o nome é obrigatório'})
        return 
       }
      
      const propertytype = new PropertyType({
        name,
        active: true,
      })
      try{
          const newPropertyType = await propertytype.save()
          res.status(201).json({
            message: 'Tipo de Propriedade cadastrado com Sucesso',
            newPropertyType,
      })
      
      }catch(error){
        res.status(500).json({message: error})
      }
    }


    // GET TYPE ById
    static async getTypeById(req, res){
      const id = req.params.id

      try{

        const propertytype = await PropertyType.findOne({
          where: { id, active: true }, // Adicionando a condição para tipo de propriedade ativas
        })
        if (!propertytype) {
          return res.status(404).json({ message: 'tipo de propriedade não cadastrado ou inativo' });
        }
         // Se o tio de propriedade for encontrada e ativa, responder com os dados
         res.status(200).json({ propertytype });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    
    }
    
    //GET TODOS TIPOS
    static async getAll(req, res){
      try {
        const propertytype = await PropertyType.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']] // Ordenar por createdAt em ordem decrescente
        });

        res.status(200).json({
            propertytype: propertytype,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
    }


  }
  
