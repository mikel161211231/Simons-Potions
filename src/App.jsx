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

  return (
    ""
  )
}

export default App
