import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import simon from "./assets/sounds/sprite.mp3";
import './App.css'

function App() {
  
  // Declarar las referencias a los elementos de colores
  const blueRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const reRef = useRef(null);

  // Initialize the library of sound with the reference to sprite.mp3
  const [play] = useSound(simon, {
    sprite: {
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      error: [4000, 500],
    }
  });

  return (
    ""
  )
}

export default App
