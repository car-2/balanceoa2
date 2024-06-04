const ValidadorProyectos = (req) =>{
    const validators = [];

    if(!req.body.Numero_Proyecto){
        validators.push("Es necesario el Número del Proyecto | Campo Unico");
    };

    if(!req.body.Titulo){
        validators.push("Es necesario en Titulo del Proyecto");
    };

    if(!req.body.Fecha_Inicio){
        validators.push("Es necesaria la fecha de Inicio del Proyecto");
    };

    if(!req.body.Fecha_Entrega){
        validators.push("Es necesaria la fecha de Entrega del Proyecto");
    };

    if(!req.body.Valor){
        validators.push("Es necesario el valor del Proyecto");
    };

    if(!req.body.Tipos_Proyectos){
        validators.push("Es necesario el Tipo de Proyecto");
    };

    if(!req.body.Clientes){
        validators.push("Es necesario el Cliente que requiere el Servicio");
    };

    if(!req.body.Universidades){
        validators.push("Es necesaria la Universidad");
    };

    if(!req.body.Etapas){
        validators.push("Es necesaria la Etapa del Proyecto");
    };

return validators;

};

module.exports={
    ValidadorProyectos,
}

