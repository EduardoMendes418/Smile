//chamando mongo
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//modeloShema State
const modelSchema = new mongoose.Schema({
   
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    viwes: Number,
    status: String,

});
const modelName = 'Ad';

//Condicao de verificao esta pronto para conecao sim se nao conecta
if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}

/************** Table Ad *************
 * id
idUser
state
category
images [{url, default: true}]
idUser
dateCreated
title
price
preceNegotiable: true
description
views
status
*/