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

module.exports = gestorDeTareas;