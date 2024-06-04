const { Router } = require('express');
const proyectos = require('../models/Proyectos');
const Clientes = require('../models/Clientes');
const Etapas = require('../models/Etapas');
const Tipos_Proyectos = require('../models/Tipos_Proyectos');
const Universidades = require('../models/Universidades');
const {  ValidadorProyectos } = require('../helpers/Validador_Proyectos');

const router = Router();

router.post('/', async function (req, res) {
    try {

        console.log('Ambiente:', process.env.HOST);
        
        const validator = ValidadorProyectos(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }
        let NewProyecto = new proyectos();

        const Numero_ProyectoExist = await proyectos.findOne({Numero_Proyecto: req.body.Numero_Proyecto});

        if (Numero_ProyectoExist) {
            return res.status(400).send("Ya existe un Proyecto asociado a ese Número ID");
        };

        NewProyecto.Numero_Proyecto = req.body.Numero_Proyecto;
        NewProyecto.Titulo = req.body.Titulo;
        NewProyecto.Fecha_Inicio = req.body.Fecha_Inicio;
        NewProyecto.Fecha_Entrega = req.body.Fecha_Entrega;
        NewProyecto.Valor = req.body.Valor;
        NewProyecto.Tipos_Proyectos = req.body.Tipos_Proyectos;
        NewProyecto.Clientes = req.body.Clientes;
        NewProyecto.Universidades = req.body.Universidades;
        NewProyecto.Etapas = req.body.Etapas;
        NewProyecto.Fecha_Creacion = new Date();
        NewProyecto.Fecha_Actualizacion = new Date();

        NewProyecto = await NewProyecto.save();
        res.send(NewProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
});

router.get('/', async function (req, res) {
    try {

        console.log('Ambiente:', process.env.HOST);

        const proyecto = await proyectos.find().populate([
            {
                path: 'Clientes', select: 'Nombre'
            },
            {
                path: 'Tipos_Proyectos', select: 'Nombre'
            },
            {
                path: 'Universidades', select: 'Nombre Direccion Telefono'
            },
            {
                path:'Etapas', select: 'Nombre'
            }
        ]);

        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
});


router.get('/', async function(req, res){
    try{
        const proyecto = await proyectos.find();
        res.send(proyecto);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
});

router.delete('/:proyectosId', async function (req, res) {
    try {

      console.log('Ambiente:', process.env.HOST);

      const NewProyecto = await proyectos.findByIdAndDelete(req.params.proyectosId);
  
      if (!NewProyecto) {
        return res.status(404).send('No se Encontro un Proyecto con ese ID');
      }
  
      res.send(`El Proyecto con el Núnero "${NewProyecto.Numero_Proyecto}" y el Titulo "${NewProyecto.Titulo}" ha sido Eliminado Correctamente`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Ha ocurrido un Error al Eliminar el Proyecto');
    }
  });

module.exports = router;