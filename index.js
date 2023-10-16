const readline = require('readline-sync');
const Tarea = require('./tareas');
const GestorDeTareas = require('./gestorDeTareas');
const Menu = require('./menu');

const gestordeTareas = new GestorDeTareas();
let tareasFiltradas = [];
let tareasBuscadas = [];

let continuar = true;

while(continuar){
   Menu.principal();
   const opcion = readline.questionInt('Seleccione una opcion: ')
   let opcion2;

   switch(opcion){
      case 1:
         do{
            Menu.opcion1();
            opcion2 = readline.questionInt('Seleccione una opcion: ');
            switch (opcion2){
               case 1://Todas
               console.log('Estas son todas tus tareas');
               tareasFiltradas = gestordeTareas.listarTareas()
               tareasFiltradas.forEach((tarea, index) => {
                  console.log(`[${index+1}] ${tarea.titulo} - Estado ${tarea.estado} - Dificultad ${tarea.dificultad}`);
               })
                  break;
               case 2://Pendientes
               console.log('Estas son tus tareas pendientes');
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('pendiente');
               tareasFiltradas.forEach((tarea, index) => {
                  console.log(`[${index+1}] ${tarea.titulo}`);
               })
                  break;
               case 3://En curso
               console.log('Estas son tus tareas en curso');
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('en curso');
               tareasFiltradas.forEach((tarea, index) => {
                  console.log(`[${index+1}] ${tarea.titulo}`);
               })
                  break;
               case 4://Terminadas
               console.log('Estas son tus tareas terminadas');
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('terminada');
               tareasFiltradas.forEach((tarea, index) => {
                  console.log(`[${index+1}] ${tarea.titulo}`);
               })
                  break;
               case 0://Salir
                  break;
               default:
                  console.log('Selecciono una opcion invalida'); 
                  break;
            }
         }while(opcion2 !== 0);
         break;
      case 2:
         const buscar = readline.question('Introduce el titulo de la tarea a buscar: ');
         tareasBuscadas = gestordeTareas.buscarTareas(buscar);
         if(tareasBuscadas.length === 0){
            console.log('No hay tareas relacionadas con la busqueda');
         } else {
            console.log('Estas son las tareas relacionadas')
            tareasBuscadas.forEach((tarea, index) => {
               console.log(`[${index+1}] ${tarea.titulo}`)
            })
            console.log('¿Deseas ver los detalles de alguna?')
            let detalles = readline.questionInt('Introduce el numero para verla o 0 para volver: ');

            if (detalles === 0){
               break;
            }else {
               detalles --;
               console.log(`Titulo: ${tareasBuscadas[detalles].titulo}`);
               console.log(`Descripcion: ${tareasBuscadas[detalles].descripcion}`);
               console.log(`Estado: ${tareasBuscadas[detalles].estado}`);
               console.log(`Creacion: ${tareasBuscadas[detalles].creacion.toLocaleDateString()}`);
               console.log(`Ultima edicion: ${tareasBuscadas[detalles].ultimaEdicion.toLocaleDateString()}`);
               console.log(`Vencimiento: ${tareasBuscadas[detalles].vencimiento.toLocaleDateString()}`);
               console.log(`Dificultad: ${tareasBuscadas[detalles].dificultad}`);
            }
         }
         break;
      case 3:
         console.log('Estas creando una tarea');
         const titulo = readline.question('1. Introduce el titulo de la tarea: ');
         const descripcion = readline.question('2. Introduce la descripcion: ');
         let estado = readline.question('3. Estado(pendiente / en curso / terminada / cancelada):  ');
         if(estado.length === 0){
            estado = 'pendiente';
         } 
         let dificultad = readline.question('4. Dificultad(facil / medio / dificil): ');
         if(dificultad.length === 0){
            dificultad = 'facil';
         } 
         const vencimiento = new Date(readline.question('5. Vencimiento (YYYY-MM-DD): '))

         try {
            gestordeTareas.crearTarea(titulo, descripcion, vencimiento, dificultad, estado);
            console.log('Tarea creada con exito');
         } catch (error) {
            console.log(error);
         }

         break;
      case 0:
         console.log('Saliste del programa');
         continuar = false;
         break;
      default:
         console.log('No ingresaste un valor valido');
         break;
   }
}


