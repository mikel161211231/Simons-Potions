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

  return (
    ""
  )
}

export default App
