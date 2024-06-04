const { Router } = require('express');
const Etapas = require('../models/Etapas');
const { ValidadorEtapas } = require('../helpers/Validador_Etapas');

const router = Router();

router.post('/', async function (req, res) {
    try {
        const validators = ValidadorEtapas(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        console.log('Objeto Recibido', req.body);
        let etapas = new Etapas();

        const NombreExists = await Etapas.findOne({Nombre: req.body.Nombre});
        console.log(NombreExists);
        if (NombreExists) {
            return res.status(400).send("El Nombre ya Existe");
        }

        etapas.Nombre = req.body.Nombre;
        etapas.Fecha_Creacion = new Date();
        etapas.Fecha_Actualizacion = new Date();
        etapas = await etapas.save();
        res.send(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const etapas = await Etapas.find();
        res.send(etapas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
});

router.put('/:EtapasId', async function (req, res) {
    try {
        const validators = ValidadorEtapas(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        let etapas = await Etapas.findById(req.params.EtapasId);
        if (!etapas) {
            return res.status(400).send("No se encontró la Etapa con ese ID");
        }

        etapas.Nombre = req.body.Nombre;
        etapas.Fecha_Actualizacion = new Date();
        etapas = await etapas.save();
        res.send(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
});

router.delete('/:EtapasId', async function (req, res) {
    try {
        const etapas = await Etapas.findByIdAndDelete(req.params.EtapasId);

        if (!etapas) {
            return res.status(404).send('No se encontró la etapa con ese ID');
        }

        res.send(`La Etapa ${etapas.Nombre} ha sido Eliminada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
});
  
module.exports = router;