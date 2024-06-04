const {Schema, model} = require('mongoose');

const EtapasSchema = Schema({
    Nombre:{
        type: String,
        required: true,
        enum:[
            'Anteproyecto',
            'Entrega parcial 1',
            'Entrega parcial 2',
            'Entrega final'
        ]
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

module.exports =model('Etapas',EtapasSchema);