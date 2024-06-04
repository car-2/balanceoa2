const { Router } = require('express');
const tipos_Proyectos = require('../models/Tipos_Proyectos');
const { ValidadorTiposProyectos } = require('../helpers/Validador_TiposProyectos');

const router = Router();

router.post('/', async function (req, res) {
    try {
        const validators = ValidadorTiposProyectos(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        console.log('Objeto Recibido', req.body);
        let tipoProyecto = new tipos_Proyectos();

        const NombreExists = await tipos_Proyectos.findOne({Nombre: req.body.Nombre});
        console.log(NombreExists);
        if (NombreExists) {
            return res.status(400).send("El Nombre ya Existe");
        }

        tipoProyecto.Nombre = req.body.Nombre;
        tipoProyecto.Fecha_Creacion = new Date();
        tipoProyecto.Fecha_Actualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const tipoProyecto = await tipos_Proyectos.find();
        res.send(tipoProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha Ocurrido un Error');
    }
});

router.put('/:tipos_ProyectosId', async function (req, res) {
    try {
        const validators = ValidadorTiposProyectos(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        let tipoProyecto = await tipos_Proyectos.findById(req.params.tipos_ProyectosId);
        if (!tipoProyecto) {
            return res.status(400).send("No se encontró el tipo de proyecto con ese ID");
        }

        tipoProyecto.Nombre = req.body.Nombre;
        tipoProyecto.Fecha_Actualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha Ocurrido un Error");
    }
});


router.delete('/:tipos_ProyectosId', async function (req, res) {
    try {
        const tipos_proyectos = await tipos_Proyectos.findByIdAndDelete(req.params.tipos_ProyectosId);

        if (!tipos_proyectos) {
            return res.status(404).send('No se encontró el tipo de proyecto con ese ID');
        }

        res.send(`El Tipo de Proyecto ${tipos_proyectos.Nombre} ha sido Eliminado Satisfactoriamente.`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha Ocurrido un Error');
    }
});

module.exports = router;