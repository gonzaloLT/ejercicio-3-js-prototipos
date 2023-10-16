function principal() {
    console.log("Que desea ver?");
    console.log("");
    console.log("[1] Ver mis tareas");
    console.log("[2] Buscar una tarea");
    console.log("[3] Agregar una tarea");
    console.log("[0] Salir.");
  }
  
  function opcion1() {
    console.log("¿Que tarea deseas ver?");
    console.log("");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[0] Salir");
  }
  
  function opcion2() {
    console.log("Introduce el titulo de una tarea para buscarla");
  }
  
  module.exports = {
    principal,
    opcion1,
    opcion2,
  };