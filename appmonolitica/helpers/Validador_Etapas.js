const ValidadorEtapas = (req) =>{
    const validators = [];

    if(!req.body.Nombre){
        validators.push("Debe Ingresar el Nombre de la Etapa");
    };

return validators;

};

module.exports={
    ValidadorEtapas,
}

