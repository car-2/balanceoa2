const {Schema, model} = require('mongoose');

const ProyectosSchema = Schema({
    Numero_Proyecto:{
        type: Number,
        required: true,
        unique: true
    },

    Titulo:{
        type: String,
        required: true,
        unique: true
    },

    Fecha_Inicio:{
        type: Date,
        required: true,
        default: null //El Valor predeternimado sera NULL, ya que el usuario ingresara la Fecha
    },

    Fecha_Entrega:{
        type: Date,
        required: true,
        default: null //El Valor predeternimado sera NULL, ya que el usuario ingresara la Fecha
    },

    Valor:{
        type: Number,
        required: true,
        unique: true
    },

    Tipos_Proyectos:{
        type: Schema.Types.ObjectId,
        ref: 'Tipos_Proyectos',
        required: true
    },

    Clientes:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },

    Universidades:{
        type: Schema.Types.ObjectId,
        ref: 'Universidades',
        required: true
    },

    Etapas:{
        type: Schema.Types.ObjectId,
        ref: 'Etapas',
        required: true
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

module.exports =model('Proyectos',ProyectosSchema);