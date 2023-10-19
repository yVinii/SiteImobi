const Broker = require('../models/Broker')

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
      
       /*
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
      */
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

    


 

  }
