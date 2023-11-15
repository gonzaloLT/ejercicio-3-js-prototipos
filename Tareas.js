function Tarea(titulo, descripcion = '', vencimiento = null, dificultad = 'facil', estado = 'pendiente'){
    if (typeof titulo !== 'string' || titulo.trim().length === 0 || titulo.trim().length > 100) {
        throw new Error('El título debe ser una cadena de hasta 100 caracteres.');
      }

    if(typeof descripcion !== 'string' || descripcion.length > 500){
        throw new Error('La descripcion tiene que ser una cadena de hasta 500 caracteres');
    }

    if(vencimiento !== null && !(vencimiento instanceof Date) && isNaN(Date.parse(vencimiento))){
        throw new Error('La fecha de vencimiento no es valida');
    }

    const dificultadesValidas = ['facil', 'medio', 'dificil'];

    if(typeof dificultad !== 'string' && !dificultadesValidas.includes(dificultad.toLowerCase())){
        throw new Error('La dificultad solo puede ser una cadena con el texto facil, medio o dificil');
    }

    const estadosValidos = ['pendiente', 'en curso', 'terminada', 'cancelada'];
    if (typeof estado !== 'string') throw new Error('El estado tiene que ser de tipo string');
    
    if(!estadosValidos.includes(estado.toLowerCase())){
        throw new Error('El estado solo puede tener el valor pendiente, en curso, terminada o cancelada');
    }

    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.creacion = new Date();
    this.ultimaEdicion = this.creacion;
    this.vencimiento = vencimiento;
    this.dificultad = dificultad.toLowerCase();
}

Tarea.prototype.cambiarEstado = function(estado){
    if (typeof estado !== 'string') throw new Error('El estado tiene que ser de tipo string');
    const estadosPermitidos = ['pendiente', 'en curso', 'terminada', 'cancelada'];

    if(!estadosPermitidos.includes(estado.toLowerCase())){
        throw new Error('El estado solo puede tener el valor pendiente, en curso, terminada o cancelada');
    }
    this.estado = estado;
    this.ultimaEdificion = new Date();
}

Tarea.prototype.cambiarDificultad = function(dificultad){
    if (typeof dificultad !== 'string') throw new Error('La dificultad tiene que ser de tipo string');
    const dificultadesPermitidas = ['facil', 'medio', 'dificil'];
    if(!dificultadesPermitidas.includes(dificultad.toLowerCase())){
        throw new Error('La dificultad solo puede tener el valor facil, medio o dificil ')
    }
    this.dificultad = dificultad;
    this.ultimaEdificion = new Date();
}



module.exports = Tarea;