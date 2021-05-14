//********* IMPORTS **************
const express = require('express');

//MUSTACHE
const mustache = require('mustache-express');

//ROTAS SITE
const router = require('./routes/index');

//ROTAS HELPERS
const helpers = require('./helpers');

//CONFIGURACAO DE ROUTAS
const app = express();

app.use((req,res,next) => {
    res.locals.h = helpers;
    next();
});

app.use('/', router);


// TRATAR REQUISICAO POST
app.use(express.json()); //BODY-PARSE

//ESPECIFICANDO 0 MUSTACHE
app.engine('mst', mustache(__dirname+'/views/parciais','.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');


module.exports = app;

