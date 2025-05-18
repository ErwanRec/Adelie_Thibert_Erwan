import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function Bouton({ cliquer }) {
  return (<button onClick={cliquer}>Connexion</button>);
}


function Checkbox({ onRoleChange}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    setIsChecked2(!event.target.checked);
    onRoleChange("professeurs");
  };
  const handleChange2 = (event) => {
    setIsChecked(!event.target.checked);
    setIsChecked2(event.target.checked);
    onRoleChange("eleves");
  };
    return (
      <>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          value={"Professeur"}
        />
        {"Professeurs"}
      </label>
      <br/>
      <label>
      <input
        type="checkbox"
        checked={isChecked2}
        onChange={handleChange2}
        value={"eleves"}
      />
      {"Élèves"}
    </label>
    </>
    );
}

function App() {
  const [login,setLogin] = useState("");
  const [password,setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const cliquer = () => {
    console.log("role choisi", role);

    fetch(`http://localhost/projetweb/transformationJson.php?role=${role}&login=${login}&password=${password}`)
     .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error("Erreur serveur : " + text);
        }
        return response.json();
      })
      .then(datas => {
        if (datas.length === 0) {
          alert("Login ou mot de passe incorrect");
      } else {
        if (role == "eleves"){
          navigate('/eleves', { state: { userData: datas } });
        } else {
          navigate('/prof', { state: { userData: datas } });
        }
      }})
      .catch(err => {
        console.error("Erreur fetch :", err.message);
        alert("Erreur de connexion : " + err.message);
      });    
  };

  console.log("login",login)
  console.log("password",password)
  console.log("role ", role);

  return (
      <div>
        <img src="Logo_SuperNote.png" alt="Logo SuperNote" width="20%"/>
        <p>Veuillez renseigner vos identifiants :</p>
        <p>Login 
        <input type='text' id='' value={login} onChange={
          (e)=>setLogin(e.target.value)
        }  /></p>
        <p>Passeword
        <input type='password' id='' value={password} onChange={
          (f)=>setPassword(f.target.value)
        }  /></p>
        <br />
        <Checkbox onRoleChange={setRole}/>
        <br />
        <Bouton cliquer={cliquer} />
    </div>
  )
}

export default App