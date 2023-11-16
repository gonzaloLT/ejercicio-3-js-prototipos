const Tarea = require("./tareas");

function gestorDeTareas(){
    this.tareas = [];
}

gestorDeTareas.prototype.crearTarea = function(titulo, descripcion, vencimiento, dificultad, estado){
    try {
        const nuevaTarea = new Tarea(titulo, descripcion, vencimiento, dificultad, estado);
        this.tareas.push(nuevaTarea);
        return nuevaTarea;
    } catch(error){
        console.log(error);
    }
}

gestorDeTareas.prototype.listarTareas = function (){
    return this.tareas;
}

gestorDeTareas.prototype.listarTareasPorEstado = function(estado){
    return this.tareas.filter(tarea => tarea.estado.toLowerCase() === estado);
}

gestorDeTareas.prototype.buscarTareas = function(buscar){
    const tareasBuscadas = this.tareas.filter(tarea => tarea.titulo.toLowerCase().includes(buscar.toLowerCase()));
    return tareasBuscadas;
}

gestorDeTareas.prototype.editarTarea = function (indice, nuevaInformacion) {
    if (indice >= 0 && indice < this.tareas.length) {
        const tareaAEditar = this.tareas[indice];

        tareaAEditar.descripcion = nuevaInformacion.descripcion || tareaAEditar.descripcion;
        tareaAEditar.vencimiento = nuevaInformacion.vencimiento || tareaAEditar.vencimiento;
        tareaAEditar.dificultad = nuevaInformacion.dificultad || tareaAEditar.dificultad;
        tareaAEditar.estado = nuevaInformacion.estado || tareaAEditar.estado;
        tareaAEditar.ultimaEdicion = new Date();

        console.log('Tarea editada exitosamente.');
    } else {
        console.log('Índice de tarea no válido.');
    }
};

gestorDeTareas.prototype.validarFecha = function (fecha) {
    const fechaValida = new Date(fecha);
    return !isNaN(fechaValida.getTime()) ? fechaValida : null;
}

gestorDeTareas.prototype.obtenerEmoji = function(dificultad){
    switch(dificultad.toLowerCase()){
        case "facil":
            return "★☆☆";
        case "medio":
            return "★★☆";
        case "dificil":
            return "★★★";
        default:
            return "";
    }
}

module.exports = gestorDeTareas;