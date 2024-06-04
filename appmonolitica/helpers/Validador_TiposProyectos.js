const ValidadorTiposProyectos = (req) =>{
    const validators = [];

    if(!req.body.Nombre){
        validators.push("Debe Ingresar el Nombre del Tipo de Proyecto");
    };

return validators;

};

module.exports={
    ValidadorTiposProyectos,
}

