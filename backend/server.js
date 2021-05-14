const app = require('./app');

//CHAMANDO O BANCO 
const mongoose = require('mongoose');

//VARIAVEIS.ENV DE CONFIGURACAO 
require('dotenv').config({path:'variaveis.env'});

//CONNECTION AO MONGO 
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.error("ERRO"+ error.message);
})

//PORTA  7777
app.set('port', process.env.PORT || 7777);
    const server = app.listen(app.get('port'), ()=>{
        console.log("Servidor rodando na porta: "+server.address().port);
});