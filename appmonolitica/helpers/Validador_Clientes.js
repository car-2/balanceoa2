const ValidadorClientes = (req) =>{
    const validators = [];

    if(!req.body.Nombre){
        validators.push("Debe Ingresar un Nombre de un Cliente");
    };

    if(!req.body.Correo){
        validators.push("Debe Ingresar un Correo");
    }

return validators;

};

module.exports={
    ValidadorClientes,
}

