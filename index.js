const readline = require('readline-sync');
const Tarea = require('./tareas');
const GestorDeTareas = require('./gestorDeTareas');
const Menu = require('./menu');

const gestordeTareas = new GestorDeTareas();
let tareasFiltradas = [];
let tareasBuscadas = [];

let continuar = true,
   seguir,
   det,
   dif,
   estadoString,
   dificultadString;

while(continuar){
   console.clear();
   Menu.principal();
   const opcion = readline.questionInt('Seleccione una opcion: ')
   let opcion2;

   switch(opcion){
      case 1:
         do{
            console.clear();
            Menu.opcion1();
            opcion2 = readline.questionInt('Seleccione una opcion: ');
            switch (opcion2){
               case 1://Todas
               console.clear();
                tareasFiltradas = gestordeTareas.listarTareas();
                if (tareasFiltradas.length > 0) {
                  console.log('Estas son todas tus tareas');
                  tareasFiltradas.forEach((tarea, index) => {
                  dif = gestordeTareas.obtenerEmoji(tarea.dificultad);
                  console.log(`[${index + 1}] ${tarea.titulo} - Estado: ${tarea.estado} - Dificultad: ${dif}`);});
                  det = readline.questionInt('Seleccione una tarea para ver sus detalles o 0 para volver al menu: ');
                  det--;
                  if (det >= 0 && det < tareasFiltradas.length) {
                     console.clear();
                     console.log('Detalles de la tarea: \n\n');
                     dif = gestordeTareas.obtenerEmoji(tareasFiltradas[det].dificultad);
                     console.log(`Titulo: ${tareasFiltradas[det].titulo} \nDescripcion: ${tareasFiltradas[det].descripcion} \nEstado: ${tareasFiltradas[det].estado} \nFecha de creacion: ${tareasFiltradas[det].creacion ? tareasFiltradas[det].creacion.toLocaleDateString() : 'Null'} \nFecha ultima edicion: ${tareasFiltradas[det].ultimaEdicion ? tareasFiltradas[det].ultimaEdicion.toLocaleDateString() : 'Null'} \nFecha de vencimiento: ${tareasFiltradas[det].vencimiento ? tareasFiltradas[det].vencimiento.toLocaleDateString() : 'Null'} \nDificultad: ${dif}`);

                     const editar = readline.question('Desea editar esta tarea? (S/N): ');
                     if (editar.toUpperCase() === 'S') {
                        const tareaAEditar = tareasFiltradas[det];
                        console.clear();
                        console.log('Proporcione la nueva información para la tarea:');
                        const nuevaInformacion = {
                           descripcion: readline.question('Nueva descripcion (presiona enter para mantener la actual): ') || tareaAEditar.descripcion,
                           dificultad: readline.question('Nueva dificultad ([1] facil / [2] medio / [3] dificil): ') || tareaAEditar.dificultad,
                           estado: readline.question('Nuevo estado ([1] pendiente / [2] en curso / [3] terminada / [4] cancelada): ') || tareaAEditar.estado,
                           vencimiento: readline.question('Nueva fecha de vencimiento (YYYY-MM-DD o enter para mantener la actual): ') || tareaAEditar.vencimiento,
                        };

                        // Validar y ajustar fecha de vencimiento
                        nuevaInformacion.vencimiento = gestordeTareas.validarFecha(nuevaInformacion.vencimiento) || tareaAEditar.vencimiento;
                       // Validar y ajustar dificultad
                        switch (nuevaInformacion.dificultad) {
                           case '1':
                              nuevaInformacion.dificultad = 'facil';
                           break;
                           case '2':
                              nuevaInformacion.dificultad = 'medio';
                           break;
                           case '3':
                              nuevaInformacion.dificultad = 'dificil';
                           break;
                           default:
                              console.log('Opción de dificultad no válida. Manteniendo la actual.');
                              nuevaInformacion.dificultad = tareaAEditar.dificultad;
                           break;
                        }

                        // Validar y ajustar estado
                        switch (nuevaInformacion.estado) {
                           case '1':
                              nuevaInformacion.estado = 'pendiente';
                           break;
                           case '2':
                              nuevaInformacion.estado = 'en curso';
                           break;
                           case '3':
                              nuevaInformacion.estado = 'terminada';
                           break;
                           case '4':
                              nuevaInformacion.estado = 'cancelada';
                           break;
                           default:
                              console.log('Opción de estado no válida. Manteniendo el actual.');
                              nuevaInformacion.estado = tareaAEditar.estado;
                           break;
                        }

                        gestordeTareas.editarTarea(det, nuevaInformacion);
                     }
                  }
               } else {
                  console.log("No tienes tareas agregadas");
               }
                  seguir = readline.question('Presione enter para continuar...');
               break;
               case 2://Pendientes
               console.clear();
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('pendiente');
               if(tareasFiltradas.length > 0){
                  console.log('Estas son tus tareas pendientes');
                  tareasFiltradas.forEach((tarea, index) => {
                     console.log(`[${index+1}] ${tarea.titulo}`);
                  })
               }else{
                  console.log('No tienes tareas pendientes');
               }
               seguir = readline.question('Presione enter para continuar...');
                  break;
               case 3://En curso
               console.clear();
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('en curso');
               if(tareasFiltradas.length > 0){
                  console.log('Estas son tus tareas en curso');
                  tareasFiltradas.forEach((tarea, index) => {
                     console.log(`[${index+1}] ${tarea.titulo}`);
                  })
               }else{
                  console.log('No tienes tareas en curso');
               }
               seguir = readline.question('Presione enter para continuar...');
                  break;
               case 4://Terminadas
               console.clear();
               tareasFiltradas = gestordeTareas.listarTareasPorEstado('terminada');
               if(tareasFiltradas.length > 0){
                  console.log('Estas son tus tareas terminadas');
                  tareasFiltradas.forEach((tarea, index) => {
                     console.log(`[${index+1}] ${tarea.titulo}`);
                  })
               }else{
                  console.log('No tienes tareas terminadas');
               }
               seguir = readline.question('Presione enter para continuar...');
                  break;
               case 0://Salir
               console.clear();
                  break;
               default:
                  console.log('Selecciono una opcion invalida'); 
                  break;
            }
         }while(opcion2 !== 0);
         break;
      case 2:
         console.clear();
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

            if (detalles === 0 || detalles > tareasBuscadas.length){
               break;
            }else {
               detalles --;
               dif = gestordeTareas.obtenerEmoji(tareasBuscadas[detalles].dificultad);
               console.log(`Titulo: ${tareasBuscadas[detalles].titulo}`);
               console.log(`Descripcion: ${tareasBuscadas[detalles].descripcion}`);
               console.log(`Estado: ${tareasBuscadas[detalles].estado}`);
               console.log(`Creacion: ${tareasBuscadas[detalles].creacion.toLocaleDateString()}`);
               console.log(`Ultima edicion: ${tareasBuscadas[detalles].ultimaEdicion.toLocaleDateString()}`);
               console.log(`Vencimiento: ${tareasBuscadas[detalles].vencimiento ? tareasBuscadas[detalles].vencimiento.toLocaleDateString() : 'Null'}`);
               console.log(`Dificultad: ${dif}`);
            }
         }
         seguir = readline.question('Presione enter para continuar...');
         break;
      case 3:
         console.clear();
         console.log('Estas creando una tarea');
         const titulo = readline.question('1. Introduce el titulo de la tarea: ');
         const descripcion = readline.question('2. Introduce la descripcion: ');
         let estado = readline.questionInt('3. Estado ([1]pendiente / [2]en curso / [3]terminada / [4] cancelada):  ');
         switch(estado){
            case 1:
               estadoString = 'pendiente'
               break;
            case 2:
               estadoString = 'en curso'
               break;
            case 3:
               estadoString = 'terminada'
               break
            case 4:
               estadoString = 'cancelada'
               break;
            default:
               estadoString = 'pendiente'
               break;
         }
         let dificultad = readline.questionInt('4. Dificultad ([1] facil / [2] medio / [3]dificil): ');
         switch(dificultad){
            case 1:
               dificultadString = 'facil'
               break;
            case 2:
               dificultadString = 'medio'
               break;
            case 3:
               dificultadString = 'dificil'
               break;
            default:
               dificultadString = 'facil'
               break;
         }
         const vencimiento = new Date(readline.question('5. Vencimiento (YYYY-MM-DD): '))

         try {
            gestordeTareas.crearTarea(titulo, descripcion, vencimiento, dificultadString, estadoString);
            console.log('Tarea creada con exito');
         } catch (error) {
            console.log(error);
         }
         seguir = readline.question('Presione enter para continuar...');
         break;
      case 0:
         console.log('Saliste del programa');
         continuar = false;
         break;
      default:
         console.log('No ingresaste un valor valido');
         seguir = readline.question('Presione enter para continuar...');
         break;
   }
}


