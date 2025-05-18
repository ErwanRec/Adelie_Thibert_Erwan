import './eleves.css';
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
          <th>Test</th>
          <th>Date</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {notes.length > 0 ? (
          notes.slice(0, 5).map((note, index) => {
  return (
    <tr key={index}>
      <td>{note.Nom_DS}</td>
      <td>{note.Date}</td>
      <td>{note.Note}</td>
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
    return (<button onClick={cliquer}>Voir plus</button>);
  }

function Eleve() { 
    const location = useLocation();
    const { userData } = location.state || {};
    const [notes, setNotes] = useState([]);

    useEffect(() => {
    if (!userData) return;
    const eleve = userData[0];
    const id = eleve.ID_Eleves;
    fetch(`http://localhost/projetweb/transformationJson.php?cinqnote=${id}`)
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
},[userData]);


    if (!userData) return <p>Aucune donnée trouvée. Veuillez vous connecter.</p>;
    const eleve = userData[0]; 
    const navigate = useNavigate();
    const cliquer = () => {
        navigate('/eleves2', { state: { user: eleve, ideleve: eleve.ID_Eleves } });
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

export default Eleve