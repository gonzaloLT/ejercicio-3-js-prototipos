function Tarea(titulo) {
    this.titulo = titulo;
    this.descripcion = '';
    this.estado = 'Pendiente';
    this.fechaCreacion = new Date();
    this.fechaVencimiento = null;
    this.dificultad = 'facil';
}

Tarea.prototype.setDescripcion = function (descripcion) {
    this.descripcion = descripcion;
}


Tarea.prototype.setEstado = function (estado) {
    estado = estado.ToLowerCase();
    if (["pendiente", "en curso", "terminada", "cancelada"].includes(estado)) {
        this.estado = estado;
    } else {
        throw new Error('Estado no valido');
    }
}

Tarea.prototype.dificultad = function (dificultad) {
    dificultad = dificultad.ToLowerCase();
    if (["facil", "medio", "dificil"].includes(dificultad)) {
        this.dificultad = dificultad;
    } else {
        throw new Error('Dificultad no valida');
    }
}

Tarea.prototype.setVencimiento = function (fechaVencimiento) {
    this.fechaVencimiento = fechaVencimiento;
}

Tarea.prototype.setToString = function () {
    return `Titulo: ${this.titulo}\nDescripcion: ${this.descripcion}\nEstado: ${this.estado}\nFecha de creacion: ${this.fechaCreacion}\nFecha de vencimiento: ${this.fechaVencimiento}\nDificultad: ${this.dificultad}\n`;
}



module.exports = Tarea;