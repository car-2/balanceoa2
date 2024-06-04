const {getConnection} = require('./db/Conexion-mongo');
const express = require('express')
const cors = require('cors');
const app = express()

const port = process.env.PORT || 6000

//process.evn.port ||
app.use(cors());
getConnection();

//Parseo Json
app.use(express.json());

app.use('/Clientes',require('./router/clientes'));
app.use('/Etapas',require('./router/etapas'));
app.use('/Universidades',require('./router/universidades'));
app.use('/Tipos_Proyectos',require('./router/tipos_Proyectos'));
app.use('/Proyectos',require('./router/proyectos'));

app.listen(port, () => {
    console.log(`Ejecución en el Puerto ${port}`)
  })


