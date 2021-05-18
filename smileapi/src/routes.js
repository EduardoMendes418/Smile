const express = require('express');
const router = express.Router();

//Rotas Private
const Auth = require('./middlewares/Auth');

//Validator
const AuthValidator = require('./validators/AuthValidator');


//Controllers
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');


router.get('/ping', (req, res) => {
    res.json({ pong: true})
});

//*************** GET *********/
//para pegar estados
router.get('/states',  UserController.getStates);
//Processo Info do proprio Usuario
router.get('/user/me', Auth.private, UserController.info);
//Processo do anuncio
router.get('/categories', AdsController.getCategories);
//Processo de lista de anuncios
router.get('/ad/list', AdsController.getList);
//Processo de anuncios especifico Item
router.get('/ad/item', AdsController.getItem);

//*************** POST *********/
//Processo de Login
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
//Processo de cadastro
router.post('/user/signup', AuthValidator.signup, AuthController.signup);
//Processo de adicionar anuncio 
router.post('/ad/add', Auth.private, AdsController.addAction);
//Processo para editar anuncios
router.post('/ad/:id', Auth.private, AdsController.editAction);

/****************** PUT *****************/
router.put('/user/me', Auth.private, UserController.editAction);

module.exports = router;