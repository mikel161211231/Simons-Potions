import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import simon from "./assets/sounds/sprite.mp3";
import './App.css'

function App() {
  
  // Declarar las referencias a los elementos de colores
  const blueRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const redRef = useRef(null);

  // Inicializar la libreria de sonnidos y hacer referencia al sprite.mp3 importado previamente
  const [play] = useSound(simon, {
    sprite: {
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      error: [4000, 500],
    }
  });

  // Declara el array de objetos para los colores, sus referencias al DOM y los sonidos correspondientes
  const colors = [
    {
      color: '#FAF303',
      ref: yellowRef,
      sound: 'one',
    },
    {
      color: '#030AFA',
      ref: blueRef,
      sound: 'two',
    },
    {
      color: '#FA0E03',
      ref: redRef,
      sound: 'three',
    },
    {
      color: '#0AFA03',
      ref: greenRef,
      sound: 'four',
    },
  ];

  // Declarar las constantes para los calculos de numeros aleatorios y la velocidad inicial del juego
  const minNumber = 0;
  const maxNumber = 3;
  const speedGame = 400;

  // Crear los hooks de estado. (No esta totalmente optimizado)
  const [sequence, setSequence] = useState([]); // Almacena la secuencia que va generando el juego
  const [currentGame, setCurrentGame] = useState([]); // Almacena la secuencia que va ejecutando el jugador
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(false); // Un booleano para permitir pulsar una tecla o no
  const [speed, setSpeed] = useState(speedGame); // Almacena los cambios de velocidad del juego, ahora se gestinara de manera progresiva
  const [turn, setTurn] = useState(0); // Almacena el numero del turno que sse esta jugando
  const [pulses, setPulses] = useState(0); // Almacena el numero de pulsaciones
  const [success, setSuccess] = useState(0); // Almacena el numero de aciertos
  const [isGameOn, setIsGameOn] = useState(false); // Almacena si el juego debe iniciarse

  // Funcion que inicializa el juego
  const initGame = () => {
    randomNumber(); // genera un numero aleatorio para la secuencia
    setIsGameOn(true); // setea isGameOn a true
  }
  
  // Funcion que genera un numero aleatorio
  const randomNumber = () => {
    setIsAllowedToPlay(false); // setea isAllowedToPlay a false
    const randomNumber = Math.floor(Math.random()*(maxNumber - minNumber +1) + minNumber); // Genera un numero aleatorio en base a las constantes 
    setSequence([...sequence, randomNumber]); // setea la sequencia al final añadiendo el numero aleatorio al final de la secuencia ya existente
    setTurn(turn +1); // suma un turno
  }

  const handleClick = (index) => {
    if (isAllowedToPlay) {
      play({id: colors[index].sound}); // Ejecutar el metodo play de la libreria de sonidos para hacer sonar la musica/sonido, en este caso cogemos del array de colors el color de la posicion introducida(index)
      // Acceder al elemento para modificar su opacity y su scale.
      colors[index].ref.current.style.opacity = (1);
      colors[index].ref.current.style.scale = (0.9);
      setTimeout(() => {
        // Acceder al elemento para modificar su opacity y su scale.
        colors[index].ref.current.style.opacity = (0.5);
        colors[index].ref.current.style.scale = (1);
        setCurrentGame([...currentGame, index]);
        setPulses(pulses +1);
      }, speed/2);
    }
  }

  // UseEffect con dependencia pulses
  useEffect(() => {
    if (pulses > 0) {
      if (Number(sequence[pulses -1]) === Number(currentGame[pulses -1])) {
        setSuccess(success +1);
      } else {
        const index = sequence[pulses -1];
        if (index) colors[index].ref.current.style.opacity = (1);
        play({id: 'error'});
        setTimeout(() => {
          if(index) colors[index].ref.current.style.opacity = (0.5);
          setIsGameOn(false);
        }, speed * 2);
        setIsAllowedToPlay(false);
      }
    }
  }, [pulses]);


  // UseEffect con dependencia isGameOn, si isGameOn es false reinici todos los valores
  useEffect(() => {
    if (!isGameOn) {
      setSequence([]);
      setCurrentGame([]);
      setIsAllowedToPlay(false);
      setSpeed(speedGame);
      setSuccess(0);
      setPulses(0);
      setTurn(0);
    }
  }, [isGameOn]);

  // UseEffect con dependencia de success
  useEffect(() => {
    if (success === sequence.length && success > 0) {
      setSpeed(speed - sequence.length*2);
      setTimeout(() => {
        setSuccess(0);
        setPulses(0);
        setCurrentGame([]);
        randomNumber();
      }, 500);
    }
  }, [success]);

  // UseEffect con dependencia de sequence
  useEffect(() => {
    if (!isAllowedToPlay) {
      sequence.map((item, index) => {
        setTimeout(() => {
          play({id: colors[item].sound});
          colors[item].ref.current.style.opacity = (1);
          setTimeout(() => {
            colors[item].ref.current.style.opacity = (0.5);
          }, speed/2);
        }, speed * index);
      })
    }
    setIsAllowedToPlay(true);
  }, [sequence]);

  return (
    
    <>
    {
      isGameOn
      ?
      <>
        <div className='header'> 
          <h1>Turn {turn}</h1>
        </div>
        <div className='container'>
          {colors.map((item, index) => {
            return(
              <div
              key={index} // para asignar el indice del elemento
              ref={item.ref} // para hacer referencia al hook userRef
              className={`pad pad-${index}` } // para crear dinamicamente una clase, ya que cada color tiene una forma diferente y debemos diferenciar las clases
              style={{backgroundColor: `${item.color}`, opacity:0.6}} // para dar estilo en linea asignando el color que toca item.color y darle una opacidad inicial
              onClick={() => handleClick(index)} // para ejecutar una funcion, "handleclick" pasandole el index para saber que color hemos pulsado, cuando pulsemos el div del coloor
              > 
              </div>
            )
          })}
        </div>
      </>
      :
      // Si isGameOn es 'false' mostraremos la pantalla inicial
      <>
        <div className='header'>
          <h1>SUPER SIMON</h1>
        </div>
        <button onClick={initGame}>START</button> {/* onClick para llamar a la funcion initGame que inicializa el juego */}
      </>
    }    
    </>
  )
}




export default App
