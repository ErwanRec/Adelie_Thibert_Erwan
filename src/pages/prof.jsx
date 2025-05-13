import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Prof.css'

function Img({ lien }) {
  return (<img src={lien} alt="Image" />);
}

function Prof() {
    return (
        <div>
        <p>Bienvenu :</p>
        <br />
        <Img lien={data.sprites.front_default} />
        <br />
      </div>
    )
  }
  
  export default Prof
