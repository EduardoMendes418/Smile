//chamando mongo
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//modeloShema User
const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String,
});
const modelName = 'User';

//Condicao de verificao esta pronto para conecao sim se nao conecta
if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}

/************** Table User *************
id
name
email
passwordHash
token
*/