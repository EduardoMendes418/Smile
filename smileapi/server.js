require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

//APIROTAS
const apiRoutes = require('./src/routes');

//CONEXAO COM DB
mongoose.connect(process.env.DATABASE, {
    //Padrao na conexao
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
//SE TIVER ALG ERROR CONEXAO
mongoose.connection.on('error', (error) => {
    console.log("Erro:", error.message);
});

//CRIANDO CONEXAO SERVIDOR
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(fileupload());

//DIRECIONAMENTO PASTA PUBLIC
server.use(express.static(__dirname+'/public'));

//RESPOSTA DA APIROUTES
server.use('/', apiRoutes);

//AVISO DE  SERVIDOR RODANDO
server.listen(process.env.PORT, ()=>{
    console.log(`Rodando no endereco: ${process.env.BASE}`);
});