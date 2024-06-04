const {Schema, model} = require('mongoose');

const ClientesSchema = Schema({
    Nombre:{
        type: String,
        required: true,
        unique: true
    },

    Correo:{
        type: String,
        required: true, 
        unique: true
    },

    Fecha_Creacion:{
        type: Date,
        required: true
    },

    Fecha_Actualizacion:{
        type: Date,
        required: true
    }

});

module.exports =model('Clientes',ClientesSchema);