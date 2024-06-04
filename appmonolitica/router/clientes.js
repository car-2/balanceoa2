const { Router } = require('express');
const Clientes = require('../models/Clientes');
const { ValidadorClientes } = require('../helpers/Validador_Clientes');

const router = Router();

router.post('/', async function (req, res) {
    try {
        const validators = ValidadorClientes(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        console.log('Objeto Recibido',req.body);
        let cliente = new Clientes();

        const NombreExists = await Clientes.findOne({Nombre: req.body.Nombre});
        console.log(NombreExists);
        if(NombreExists){
            return res.status(400).send("El Nombre ya Existe");
        }

        const correoExists = await Clientes.findOne({Correo: req.body.Correo});
        console.log(correoExists);
        if (correoExists) {
            return res.status(400).send("El Correo ya Existe");
        }

        cliente.Nombre = req.body.Nombre;
        cliente.Correo = req.body.Correo;
        cliente.Fecha_Creacion = new Date();
        cliente.Fecha_Actualizacion = new Date();
        cliente = await cliente.save();
        res.send(cliente);
    } catch (error) {
        res.status(500).send('Ocurrió un Error');
        console.log(error);
    }
});


router.get('/', async function (req, res) {
    try {
        const cliente = await Clientes.find();
        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha Ocurrido un Error");
    }

});

router.put('/:ClientesId', async function (req, res) {
    try {
        const validators = ValidadorClientes(req);
        if (validators.length > 0) {
            return res.status(400).send(validators);
        }

        let cliente = await Clientes.findById(req.params.ClientesId);
        if (!cliente) {
            return res.status(400).send("No se encontró el cliente con ese ID");
        }

        cliente.Nombre = req.body.Nombre;
        cliente.Correo = req.body.Correo;
        cliente.Fecha_Actualizacion = new Date();
        cliente = await cliente.save();
        res.send(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha Ocurrido un Error");
    }
});

router.delete('/:ClientesId', async function (req, res) {
    try {
        const cliente = await Clientes.findByIdAndDelete(req.params.ClientesId);

        if (!cliente) {
            return res.status(404).send('No se encontró el cliente con ese ID');
        }

        res.status(200).send({ message: 'Cliente Eliminado Satisfactoriamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha Ocurrido un Error');
    }
});

  
module.exports = router;