const {getConnection} = require('./db/Conexion-mongo');
const express = require('express')
const cors = require('cors');
const app = express()

const port = process.env.PORT || 7000

//process.evn.port ||
app.use(cors());
getConnection();

//Parseo Json
app.use(express.json());

app.use('/Universidades',require('./router/universidades'));

app.listen(port, () => {
    console.log(`Ejecución en el Puerto ${port}`)
  })


