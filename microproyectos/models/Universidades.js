const {Schema, model} = require('mongoose');

const UniversidadesSchema = Schema({
    Nombre:{
        type: String,
        required: true,
        unique: true
    },

    Direccion:{
        type: String,
        required: true, 
        unique: true
    },

    Telefono:{
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

module.exports =model('Universidades',UniversidadesSchema);