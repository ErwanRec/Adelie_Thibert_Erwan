import './eleves.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Identite(props) {  
    return (
        <div>
            <img src={props.image} alt="Photo d'identité" />
            <p>{props.nom} {props.prenom}</p>
            <p>Classe {props.classe}</p>
        </div>);
}


function TableNotes({notes}) {  
    return (
        <table>
            <thead>
            <tr>
                <th>Matière</th>
                <th>Notes</th>
                <th>Moyenne</th>
            </tr>
            </thead>
            <tbody>
        {notes.length > 0 ? (
          notes.slice(0, 5).map((note, index) => {
  return (
    <tr key={index}>
      <td>{note.ID_Matiere}</td>
      <td>{note.notes}</td>
      <td>{note.moyenne}</td>
    </tr>
  );
})
        ) : (
          <tr>
            <td colSpan="3">Aucune note disponible</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
function Bouton({ cliquer }) {
    return (<button onClick={cliquer}>Voir moins</button>);
  }

function Eleve2() {
    const location = useLocation();
    const { user, ideleve } = location.state || {};
    const [notes, setNotes] = useState([]);

    useEffect(() => {
    if (!user) return;
    fetch(`https://eprudhommea.zzz.bordeaux-inp.fr/transformationJson.php?globalenote=${ideleve}`)
  .then(async (response) => {
    const text = await response.text();
    console.log("Réponse brute :", text); 

    if (!response.ok) {
      throw new Error("Erreur serveur : " + text);
    }

    try {
      const data = JSON.parse(text); 
      return data;
    } catch (e) {
      throw new Error("Réponse invalide (non JSON) : " + text);
    }
  })
  .then(datas => {
    if (!datas || datas.length === 0) {
      alert("Vous n'avez pas de notes");
    } else {
      setNotes(datas);
    }
  })
  .catch(err => {
    console.error("Erreur fetch :", err.message);
    alert("Erreur de connexion : " + err.message);
  });
},[user]);


    if (!user) return <p>Aucune donnée trouvée. Veuillez vous connecter.</p>;
    const eleve = user;
    const navigate = useNavigate();
    const cliquer = () => {
        navigate('/eleves', { state: { userData: [user] } });
    }
    return (
        <>
        <Identite
            image = {eleve.Photo}
            nom = {eleve.Nom}
            prenom = {eleve.Prenom}
            classe = {eleve.ID_Classe}/>
        <br />
        <TableNotes notes = {notes} />
        <br />
        <Bouton cliquer = {cliquer}/>
        </>
        
    )
}

export default Eleve2