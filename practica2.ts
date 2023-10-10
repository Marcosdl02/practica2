
console.log("Bienvenido al Trivial\n");

const Jugadores=prompt("Introduce el numero de jugadores: ");

let Jugador:string[]=new Array(Number(Jugadores));
let preguntasAcertadas:number[]= new Array(Number(Jugadores)).fill(0); // Array de contadores de aciertos de cada jugador inicializados desde el principio a 0

for(let i=0;i<Number(Jugadores);i++){

   Jugador[i] = prompt("Introduce el nombre del jugador "+(i+1)+": ")!; // No sera null en ningun caso, se utiliza el operador !
}

const url ="https://opentdb.com/api.php?amount=30&type=boolean&encode=url3986"; // Utilizamos un valor de amount alto para evitar que se repitan algunas de las preguntas que se responderán
let preguntasTotales; 
let nJugadores= Number(Jugadores)
let preguntasPorJugador;
let contadorPreguntas=0;
let pregunta;



fetch(url)
    .then(response=>response.json())
    .then(data => {
        preguntasTotales=prompt("¿Cuantas preguntas totales queréis que haya en el juego?: "); // El usuario indica las preguntas totales del juego, para despues dividirlas entre los n jugadores 
        preguntasPorJugador=preguntasTotales/nJugadores;

        console.log("Datos iniciales:\n")
        console.log("Numero de jugadores:",Jugadores+"\n");

    for(let i=0;i<Number(Jugadores);i++){

        console.log("Nombre del jugador "+(i+1)+": "+Jugador[i]+"\n");
    }

    console.log("Numero de preguntas por jugador: "+preguntasPorJugador+"\n");
    console.log("-------------------------------------------------------\n");
    console.log("COMIENZA EL JUEGO\n");

    do{
        for(let i=0;i<Jugador.length;i++){

            console.log("Turno de "+Jugador[i]+"\n");

            let dificultad=prompt("Elige la dificultad de la pregunta: easy, medium o hard => ");

            const preguntasFiltradas=data.results.filter((preguntas:any) => preguntas.difficulty === dificultad); // Any para evitar el fallo "Parameter 'preguntas' implicitly has an 'any' type"  y no realizar para ello una interfaz o un tipo
            let aleatorio = Math.floor(Math.random()*(preguntasFiltradas.length)); // Referencia de internet: Como crear un numero aleatorio en TypeScript
            pregunta=preguntasFiltradas[aleatorio].question;
            console.log(decodeURIComponent(pregunta)+"\n"); // Cambiamos el formato para que no salga en consola preguntas como %22Undertale%22%20is%20an%20RPG%20created%20by%20Toby%20Fox%20and%20released%20in%202015.

            const respuestas = [...data.results[aleatorio].incorrect_answers, data.results[aleatorio].correct_answer];
        
            for (let j = respuestas.length - 1; j > 0; j--) { // referencia de internet: Mezclar elementos aleatoriamente en un array (Typescript)
                const randomIndex = Math.floor(Math.random() * (j + 1));
                [respuestas[j], respuestas[randomIndex]] = [respuestas[randomIndex], respuestas[j]]; // Intercambio de elementos
            }
            
            console.log("Posibles respuestas: ")
            respuestas.forEach((respuesta, index) => {
                console.log(`${respuesta}`);
            });

            let respuestaUsuario = prompt("\nIntroduce tu respuesta (1 para True, 2 para False): ");

            // Convertimos a true o false para comparar con los datos introducidos en results de la API
            if(respuestaUsuario==='1'){
                respuestaUsuario="True";  
            }
            else{
                respuestaUsuario="False";
            }

            if(respuestaUsuario===data.results[aleatorio].correct_answer){
                console.log("Respuesta correcta\n");
                preguntasAcertadas[i]++;
            }
            else{
                console.log("Respuesta incorrecta\n");
            }
            contadorPreguntas++;
        }
        

    }while(contadorPreguntas!=preguntasTotales); // Termina cuando los jugadores han respondido todas sus preguntas

console.log("-------------------------------------------------------\n");
console.log("Fin del Juego\n");

let maxPuntaje = Math.max(...preguntasAcertadas); // Obtiene la máxima cantidad de preguntas acertadas
const ganadores = Jugador.filter((_, index) => preguntasAcertadas[index] === maxPuntaje); // Se forma un array con el jugador/los jugadores que hayan acertado mas preguntas

if (ganadores.length === 1) { // Solo hay un jugador que ha acertado mas preguntas que el resto y por tanto, ha ganado
    console.log(`El ganador es ${ganadores[0]} con ${maxPuntaje} respuestas correctas`);
} else { // Ha habido dos jugadores que han acertado las mismas preguntas y han empatado 
    console.log(`Hubo un empate entre ${ganadores.join(" y ")} con ${maxPuntaje} respuestas correctas`);
}
       
})


