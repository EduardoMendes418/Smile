const State = require('../models/State');

//INFORMACAO DO PROPRIO USUARIO
module.exports = {
    getStates: async (req , res) => {
        let states = await State.find();
        res.json({states});
    },
    info: async (req,res) => {

    },
    editAction: async (res,req) => {

    },
};