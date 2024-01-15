const Broker = require('../models/Broker')
const Properties = require('../models/Properties'); 

module.exports = class BrokerController {
    //create a Broker
    static async create(req, res){
      const {email ,name ,phone , creci} = req.body
       const active = true

       //validation 
       if(!name){
        res.status(422).json({ message : 'o nome é obrigatório'})
        return 
       }
       if(!email){
        res.status(422).json({ message : 'o email é obrigatório'})
        return 
       }
       if(!phone){
        res.status(422).json({ message : 'o telefone é obrigatório'})
        return 
       }

       if(!creci){
        res.status(422).json({ message : 'o creci do corretor é obrigatório'})
        return 
       }
      
       
      //check if broker exists
      const brokerExist = await Broker.findOne({
        where: { email: email.trim().toLowerCase() }
      });      
      if(brokerExist){
        res
        .status(422).json({
            message: 'Por favor, utilize outro email!',
        })
        return
      }
      
      const broker = new Broker({
        name,
        email,
        phone,
        creci,
        active: true,
      })
      try{
          const newBroker = await broker.save()
          res.status(201).json({
            message: 'Corretor cadastrado com Sucesso',
            newBroker,
      })
      
      }catch(error){
        res.status(500).json({message: error})
      }
    }


    // GET Broker ById
    static async getBrokerById(req, res){
      const id = req.params.id

      try{

        const broker = await Broker.findOne({
          where: { id, active: true }, // Adicionando a condição para Corretores ativos
        })
        if (!broker) {
          return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
        }
         // Se o corretor for encontrado e ativo, responder com os dados
         res.status(200).json({ broker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    
    }
    
    //GET TODOS CORRETORES
    static async getAll(req, res){
      try {
        const broker = await Broker.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']] // Ordenar por createdAt em ordem decrescente
        });

        res.status(200).json({
            broker: broker,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
    }

  
    //EDITAR CORRETORES
    static async updateBroker(req, res){
      const id = req.params.id;
      const {email ,name ,phone , creci} = req.body
     

      try{
      //check if broker exists
     
      const broker = await Broker.findOne({
          where: { id, active: true }, // Adicionando a condição para corretores ativos
      });
      if (!broker) {
          return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
      }

      let updateData = {};

      //validations

      if(!name){
        res.status(422).json({ message : 'o nome é obrigatório'})
        return 
       } else{
        updateData.name = name
       }

       if(!email){
        res.status(422).json({ message : 'o email é obrigatório'})
        return 
       } else{
        updateData.email = email
       }

       if(!phone){
        res.status(422).json({ message : 'o telefone é obrigatório'})
        return 
       } else{
        updateData.phone = phone
       }

       if(!creci){
        res.status(422).json({ message : 'o creci do corretor é obrigatório'})
        return 
       } else{
        updateData.creci = creci
       }
       // Update data object
        updateData = {
          name,
          email,
          phone,
          creci,
      };
     
       // Atualizando o corretor com os novos dados
       await broker.update(updateData);

       res.status(200).json({
           message: 'Corretor atualizado com sucesso!',
       });
      } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Erro interno do servidor' });
   }}


   //DELETAR CORRETOR
   static async deleteBrokerById(req, res){
            const id = req.params.id;
          
            //check if broker exists
           try{
            const broker = await Broker.findOne({
                where: { id, active: true }, // Adicionando a condição para corretores ativos
            });
            if (!broker) {
                return res.status(404).json({ message: 'Corretor não cadastrado ou inativo' });
            }
             // Consulta para encontrar propriedades associadas a este corretor
            const properties = await Properties.findAll({
                  where: {
                      idBroker: broker.id
                  }
                  });

      
           // Verificando se há propriedades associadas a este corretor
           if (!properties || properties.length > 0) {
                return res.status(404).json({ message: 'Impossível excluir o corretor, pois há propriedades associadas a ele.' });
           }else {
             // Altera o valor da coluna 'active' para false
             broker.active = false;
    
             // Salva a alteração no banco de dados
             await broker.save();
           }
             res.status(200).json({ message: 'Corretor marcado como inativo com sucesso!' });
         } catch (error) {
             console.error(error);
             res.status(500).json({ message: 'Erro interno do servidor' });
         }
      
   }
    

  }
  
