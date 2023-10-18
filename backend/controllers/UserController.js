const createUserToken = require('../helpers/create-user-token')
const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

    static async register(req, res){
       const {email ,name ,phone ,password ,confirmpassword } = req.body
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
       if(!password){
        res.status(422).json({ message : 'a senha é obrigatória'})
        return 
       }
       if(!confirmpassword){
        res.status(422).json({ message : 'confirmar a senha é obrigatório'})
        return 
       }
       if(password !== confirmpassword){
        res.status(422).json({ message : 'As senhas precisam ser iguais'})
        return 
       }
      //check if user exists
      const userExists = await User.findOne({
        where: { email: email.trim().toLowerCase() }
      });      
      if(userExists){
        res
        .status(422).json({
            message: 'Por favor, utilize outro email!',
        })
        return
      }
      //create a password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      const user = new User({
        name,
        email,
        phone,
        password: passwordHash,
        active: true,
      })

      try{
        const newUser = await user.save()
          await createUserToken(newUser, req, res)
      }catch(error){
        res.status(500).json({message: error})
      }
    }

    // lOGIN USUARIO
    static async login(req, res){
      const{email, password} = req.body

      if(!email){
        res.status(422).json({ message : 'o email é obrigatório'})
        return 
      }

      if(!password){
        res.status(422).json({ message : 'a senha é obrigatória'})
        return 
      }
      const user = await User.findOne({
        where: { email: email.trim().toLowerCase() }
      }); 

      if(!user){
        res
        .status(422).json({
            message: 'Usuário não cadastrado, Por favor verifique os dados e tente novamente!',
        })
        return
      }
      // check if password match with db password
      const checkPassword = await bcrypt.compare(password, user.password)

      if(!checkPassword){
        res
        .status(422).json({
            message: 'Senha do Usuário Incorreta, Por favor verifique os dados e tente novamente!',
        })
        return
      }
      await createUserToken(user, req, res)
  }
  
  static async checkUser(req, res){
    let currentUser

    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findByPk(decoded.id)

      currentUser.password = undefined

    }else{
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  static async getUserById(req, res){

    const id = req.params.id
    try{
    const user = await User.findByPk(id, {
      attributes: {exclude: ['password'] }
    })
    if(!user){
      res
      .status(422).json({
          message: 'Usuário não encontrado, Por favor verifique os dados e tente novamente!',
      })
      return
    }

    res.status(200).json({user})
    }catch(error){
      console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }

  }

  // UPDATE USUARIO
  static async editUser(req, res){
    const id = req.params.id

    //check if user exist
    const token = getToken(req)
    const user = await getUserByToken(token)
    
    const { name,email,phone,password,confirmpassword } = req.body

    //validation
    if(!name){
      res.status(422).json({ message : 'o nome é obrigatório'})
      return 
     }
     if(!email){
      res.status(422).json({ message : 'o email é obrigatório'})
      return 
     }

     // check if email has already taken
     const userExist = await User.findOne({email: email})

     if(user.email !== email && userExist){
        res.status(422).json({
          message: 'Por favor utilize outro email!'
        })
        return
     }

     user.email = email

     if(!phone){
      res.status(422).json({ message : 'o telefone é obrigatório'})
      return 
     }

     user.phone = phone

     if(password !== confirmpassword){
      res.status(422).json({ message : 'As senhas precisam ser iguais'})
      return 
     }else if(password === confirmpassword && password != null){
      // creating password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash

     }
        try{
          await user.save(); // Salvando alterações no banco de dados
          res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
          })
        }catch(error){
          res.status(500).json({message:error})
          return
        }
    }
}