//chamando mongo
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//modeloShema State
const modelSchema = new mongoose.Schema({
    name: String,
    slug: String,
});
const modelName = 'Category';

//Condicao de verificao esta pronto para conecao sim se nao conecta
if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}

/************** Table Category *************
id
name
slug
*/