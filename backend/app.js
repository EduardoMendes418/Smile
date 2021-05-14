const express = require('express');

//Rotas
const router = express.Router();
    router.get('/', (req,res) => {
    res.send('Ola Mundo! 2.0.1');
});

//Configuracao
const app = express();
app.use('/', router);

//Module App
module.exports = app;

