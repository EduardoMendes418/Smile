const User = require('../models/User');


//Autenticacao deixando as Paginas privada
module.exports = {
    private: async (req , res , next) => {
        //verificacao se mando alguma coisa
        if(!req.query.token && !req.body.token){
            res.json({notallowed: true});
            return;
        }
        
        // se mandou 
        let token = '';
        if(req.query.token) {
            token = req.query.token;
        }
        if(req.body.token){
            token = req.body.token;
        }

        //verifica se ele preencheu
        if(token == ''){
            res.json({notallowed:true});
            return;
        }

        //verificacao se é token valido 
        const user = await User.findOne({token});
        //se  nao achou bloquea
        if(!user){
            res.json({notallowed:true});
            return;    
        }


        next();
    }

}