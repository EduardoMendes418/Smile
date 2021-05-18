
const { validationResult, matchedData } = require('express-validator');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');
const { update } = require('../models/User');
const bcrypt = require('bcrypt');


//INFORMACAO DO PROPRIO USUARIO
module.exports = {
    
    //BUSCANDO ESTADO 
    getStates: async (req , res) => {
        let states = await State.find();
        res.json({states});
    },
    

    //Buscando Informação do usuario  e anuncios do usuario
    info: async (req, res) => {

        let token = req.query.token;

        const user = await User.findOne({token});
        const state = await State.findById(user.state);
        const ads = await Ad.find({idUser: user._id.toString()})

        let adList = [];
        for(let i in ads){
            const cat = await Category.findById(ads[i].category);   
            //opcao 1
            adList.push({ ...ads[i], category: cat.slug });
           
            //opcao 2
            /* adList.push({
                id: ads[i],_id,
                status: ads[i].status,
                images: ads[i].images,
                dateCreated: ads[i].dateCreated,
                title: ads[i].title,
                price: ads[i].price,
                priceNegotiable: ads[i].priceNegotiable,
                description: ads[i].description,
                views: ads[i].views,
                category: cat.slug
            })*/
        }

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        });
    },

    //ALTERAR INFORMCAO DO USUARIO
    editAction: async (req ,res ) => {

         //VALIDACAO DO ENVIO EDITAR
         const errors = validationResult(req);
         
         //tem algum error nao esta vazio    
         if(!errors.isEmpty()){
             res.json({ error: errors.mapped()});
             return;
         }

        //salvei meus dados
        const data = matchedData(req); 
        let updates = {};
        
        //VERIFICACAO DO NOME PODE TROCAR NOME 
        if(data.name){
            updates.name = data.name;
        }

        //VERIFICACAO SE JA EXISTE EMAIL E EDITAR EMAIL
        if(data.email){
            const emailCheck = await User.findOne({email: data.email});
            if(emailCheck){
                res.json({error: 'E-mail já existente !'});
            }
            updates.email = data.email;
        }

        //VERIFICA  SE JA EXISTE ESTADO E EDITA ESTADO
        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)) {  // verifica se state é id valido 

            const stateCheck = await State.findById(data.state);
            if(!stateCheck){
                res.json({error: 'Estado não existe'});
            }
            updates.state = data.state;

            }
        }

        //VERIFICACAO TROCA DE SENHA 
        if(data.password){
            updates.passwordHash = await bcrypt.hash(data. password, 10);
        }

        //NO FIM APENAS ATUALIZAR O QUE TEM QUE ATUALIZAR
        await User.findOneAndUpdate({token: data.taken}, {$set:updates});

        res.json({});
    },
};