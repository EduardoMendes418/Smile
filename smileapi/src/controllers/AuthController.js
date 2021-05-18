
const mongoose = require('mongoose');
const { validationResult, matchedData } = require('express-validator');
const User = require('../models/User');
const State = require('../models/State');
const bcrypt = require('bcrypt');

//AUTENTICACAO  DOS CONTROLLES
module.exports =  {
    
    //PROCESSO DE LOGIN
    signin: async (req, res) => {

        //VALIDACAO DO ENVIO
        const errors = validationResult(req);
        //tem algum error nao esta vazio    
        if(!errors.isEmpty()){
            res.json({ error: errors.mapped()});
            return;
        }
         //salvei meus dados
         const data = matchedData(req); 


        //VALIDADO O EMAIL
        const user = await User.findOne({email: data.email});
        //se nao achar
        if(!user){
            res.json({error: 'E-mail e/ou senha errados !'});
            return;
        }

        //VALIDADO A SENHA 
        const match = await bcrypt.compare(data.password, user.passwordHash);
         //se nao achar
         if(!match) {
            res.json({error: 'E-mail e/ou senha errados !'});
            return;
        }

          //GERAR UM TOKEN 
          const payload = (Date.now() + Math.random()).toString();
          const  token = await bcrypt.hash(payload, 10);
          
          //salva token no usuario e salva
          user.token = token;
          await user.save();

          res.json({ token, email: data.email });
    },

    //PROCESSO DE CADASTRO
    signup: async (req, res) => {
       
        //VALIDACAO DO ENVIO
        const errors = validationResult(req);
            //tem algum error nao esta vazio    
            if(!errors.isEmpty()){
                res.json({ error: errors.mapped()});
                return;
            }
        //salvei meus dados
        const data = matchedData(req); 


        //VERIFICANDO SE EMAIL JA EXISTE
        const user = await User.findOne({
                email: data.email
            });
            if(user){
                res.json({
                    error: {email:{msg: 'E-mail já existe !'}}
                });
                return;
            }

        //VERIFICANDO SE ESTADO JA EXISTE
        if(mongoose.Types.ObjectId.isValid(data.state)) { // verifica se state é id valido 
            const stateItem = await State.findById(data.state);
                if(!stateItem){
                    res.json({
                        error: {state:{msg: 'Estado já existe !'}}
                    });
                    return;
                }
            } else {
                res.json({
                    error: {state:{msg: 'Codigo de Estado inválido!'}}
                });
                return;
            }   

          //CRIPTOGRAFANDO SENHA
          const passwordHash = await bcrypt.hash(data.password, 10);
          
          //GERAR UM TOKEN
          const payload = (Date.now() + Math.random()).toString();
          const  token = await bcrypt.hash(payload, 10);

          //CRIANDO O USUARIO   
          const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
          });
          await newUser.save();

          //OK TUDO CERTO
          res.json({token});

    },
};



//senha //12222

//token $2b$10$j14.quMUKVTmV3nSBGobP.lE4nc8HYYnq61ZxCKV8ndUl4WmjJzyu