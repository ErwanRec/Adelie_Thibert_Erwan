import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Prof.css'

function Img({ Idprof }) {
  const randomNumber = Math.floor(Math.random() * 151) + 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(r => r.json())
    .then(datas => { setData(datas) });
  return (<img src={Idprof} alt="Image" />);
}

function Prof() {
    
  }
  
  export default Prof
