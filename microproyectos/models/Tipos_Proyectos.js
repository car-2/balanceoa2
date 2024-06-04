const {Schema, model} = require('mongoose');

const Tipos_ProyectosSchema = Schema({
    Nombre:{
        type: String,
        required: true,
        enum:[
            'Ensayo',
            'Articulo',
            'Monografia',
            'Trabajo final pregrado',
            'Trabajo final especialización'
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

module.exports =model('Tipos_Proyectos',Tipos_ProyectosSchema);