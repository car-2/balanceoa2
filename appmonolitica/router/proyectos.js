const { Router } = require('express');
const proyectos = require('../models/Proyectos');
const {  ValidadorProyectos } = require('../helpers/Validador_Proyectos');

const router = Router();

router.post('/', async function (req, res) {
    try {
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
        const proyecto = await proyectos.find().populate([
            {
                path: 'Clientes'
            },
            {
                path: 'Tipos_Proyectos'
            },
            {
                path: 'Universidades'
            },
            {
                path:'Etapas'
            }
        ]);

        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
});

router.put('/:proyectosId', async function (req, res) {
    try {
        const validators = ValidadorProyectos(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        let NewProyecto = await proyectos.findById(req.params.proyectosId);
        if (!NewProyecto) {
            return res.status(400).send("No Existe un Proyecto con ese Número | ID"); 
        }

        const Numero_ProyectoExists = await proyectos.findOne({Numero_Proyecto: req.body.Numero_Proyecto, _id: { $ne: NewProyecto._id } }); 
        if (Numero_ProyectoExists) { 
            return res.status(400).send("Ya existe un proyecto asociado a ese número de proyecto");
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
        NewProyecto.Fecha_Actualizacion = new Date();

        NewProyecto = await NewProyecto.save();
        res.send(NewProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
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