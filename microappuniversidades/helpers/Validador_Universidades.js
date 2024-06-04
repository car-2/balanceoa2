const ValidadorUniversidades = (req) =>{
    const validators = [];

    if(!req.body.Nombre){
        validators.push("Debe Ingresar el Nombre de la Universidad");
    };

    if(!req.body.Direccion){
        validators.push("Debe Ingresar la Dirección de la Universidad");
    };

    if(!req.body.Telefono){
        validators.push("Debe Ingresar el Teléfono de la Universidad");
    };

return validators;

};

module.exports={
    ValidadorUniversidades,
}

