import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Bouton({ cliquer }) {
  return (<button onClick={cliquer}>Connexion</button>);
}

function Img({ lien }) {
  return (<img src={lien} alt="Image" />);
}

function Checkbox({ label ,label2}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    setIsChecked2(!event.target.checked);
  };
  const handleChange2 = (event) => {
    setIsChecked(!event.target.checked);
    setIsChecked2(event.target.checked);
  };
    return (
      <>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          value={label}
        />
        {label}
      </label>
      <br/>
      <label>
      <input
        type="checkbox"
        checked={isChecked2}
        onChange={handleChange2}
        value={label2}
      />
      {label2}
    </label>
    </>
    );
}

function App() {
  const [data, setData] = useState({ name: "", sprites: { front_default: null } });
  const [login,setLogin] = useState("")
  const [password,setPassword] = useState("")

  const cliquer = () => {
    console.log("login dans cliquer",login)
    const randomNumber = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then(r => r.json())
      .then(datas => { setData(datas) });
  };

  console.log("login",login)
  console.log("password",password)

  return (
      <div>
      <p>Veuillez renseigner vos identifiants :</p>
      <p>Login :</p>
      <input type='text' id='' value={login} onChange={
        (e)=>setLogin(e.target.value)
      } name='' />
      <p>Passeword :</p>
      <input type='password' id='' value={password} onChange={
        (f)=>setPassword(f.target.value)
      } name='' />
      <br />
      <Checkbox label ='Professeur' label2 ='Etudiant'/>
      <br />
      <Img lien={data.sprites.front_default} />
      <br />
      <Bouton cliquer={cliquer} />
    </div>
  )
}

export default App