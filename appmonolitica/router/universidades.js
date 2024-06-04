const { Router } = require('express');
const Universidades = require('../models/Universidades');
const { ValidadorUniversidades } = require('../helpers/Validador_Universidades');

const router = Router();

router.post('/', async function (req, res) {
  try {
    const validators = ValidadorUniversidades(req);
    if (validators.length > 0) {
      return res.status(400).send(validators);
    }
    console.log('Objeto Recibido', req.body);
    let universidad = new Universidades();

    const direccionExists = await Universidades.findOne({Direccion: req.body.Direccion});
    console.log(direccionExists);
    if (direccionExists) {
      return res.status(400).send("La dirección ya existe");
    }

    const telefonoExists = await Universidades.findOne({ Telefono: req.body.Telefono });
    console.log(telefonoExists);
    if (telefonoExists) {
      return res.status(400).send("El teléfono ya existe");
    }

    universidad.Nombre = req.body.Nombre;
    universidad.Direccion = req.body.Direccion;
    universidad.Telefono = req.body.Telefono;
    universidad.Fecha_Creacion = new Date();
    universidad.Fecha_Actualizacion = new Date();
    universidad = await universidad.save();
    res.send(universidad);
  } catch (error) {
    res.status(500).send('Ocurrió un error');
    console.log(error);
  }
});


router.get('/', async function (req, res) {
  try {
    const universidad = await Universidades.find();
    res.send(universidad);

  } catch (error) {
    console.log(error)
  }
});

router.put('/:UniversidadesId', async function (req, res) {
  try {
    const validators = ValidadorUniversidades(req);
    if (validators.length > 0) {
      return res.status(400).send(validators);
    }

    let universidad = await Universidades.findById(req.params.UniversidadesId);
    if (!universidad) {
      return res.status(400).send("No se encontró la universidad con ese ID");
    }

    universidad.Nombre = req.body.Nombre;
    universidad.Direccion = req.body.Direccion;
    universidad.Telefono = req.body.Telefono;
    universidad.Fecha_Actualizacion = new Date();
    universidad = await universidad.save();
    res.send(universidad);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
});

router.delete('/:universidadId', async function (req, res) {
  try {
    const universidad = await Universidades.findByIdAndDelete(req.params.universidadId);

    if (!universidad) {
      return res.status(404).send('No se encontró la universidad con ese ID');
    }

    res.send(`La universidad ${universidad.Nombre} se Eliminó Satisfactoriamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ha ocurrido un error');
  }
});

module.exports = router;