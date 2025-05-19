import { useState, useEffect } from 'react';
import './eleves.css';
import { useLocation } from 'react-router-dom';



// Composant pour afficher l'image
function Img({ data }) {
  return (
    <div>
        <img src={data.Photo} alt="Image du professeur" width="40%"/>
    </div>
  );
}

// Composant pour afficher le nom du professeur
function Texte({ data }) {
  return <label>{data ? `${data.Nom} ${data.Prenom}` : 'Nom non disponible'}</label>;
}

function Bouton({ cliquer }) {
  return (<button onClick={cliquer}>Visualiser</button>);
}
function Bouton1({ cliquer }) {
  return (<button onClick={cliquer}>Réduire</button>);
}

// Composant principal qui gère l'affichage des données
function Prof() {
  const location = useLocation();
  const { userData } = location.state || {};
  const [Ds, setDs] = useState([]);
  const [Classe, setClasse] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [afficherTableau, setAfficherTableau] = useState(false);


const handleSingleCheckboxChange = (index) => {
  if (selectedIndex === index) {
    setSelectedIndex(null);
  } else {
    setSelectedIndex(index);
  }
};

useEffect(() => {
    if (!userData) return;
    const prof = userData[0];
    const id = prof.ID_Matiere;
    fetch(`https://eprudhommea.zzz.bordeaux-inp.fr/transformationJson.php?matiere=${id}`)
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
      alert("Vous n'avez pas mit de notes");
    } else {
      setDs(datas);
    }
  })
  .catch(err => {
    console.error("Erreur fetch :", err.message);
    alert("Erreur de connexion : " + err.message);
  });
},[userData]);

const cliquer = () => {
  if (selectedIndex === null) {
    alert("Veuillez sélectionner un DS.");
    return;
  }

  const classeChoisie = Ds[selectedIndex]?.Classe;
  fetch(`https://eprudhommea.zzz.bordeaux-inp.fr/transformationJson.php?classe=${classeChoisie}&DS=${Ds[selectedIndex]?.Nom_DS}&mat=${prof.ID_Matiere}`)
     .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error("Erreur serveur : " + text);
        }
        return response.json();
      })
      .then(datas => {
        if (datas.length === 0) {
          alert("pas d'élèves' ayant fait se DS");
      } else {
        setClasse(datas);
        setAfficherTableau(true);
      }})
      .catch(err => {
        console.error("Erreur fetch :", err.message);
        alert("Erreur de connexion : " + err.message);
      });
  }

  const cliquer2 = () => {
  setAfficherTableau(false);
};


  const prof = userData[0];
  return (
    <div>
      <Img data={prof} />
      <p><Texte data={prof} /></p>
      <p>Professeur de {prof.ID_Matiere}</p>
      <br />
      <table>
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col">Classe</th>
            <th scope="col">Date</th>
            <th scope="col">Sélectionner</th>
          </tr>
        </thead>
        <tbody>
          {Ds.length > 0 ? (
          Ds.map((Ds, index) => {
  return (
    <tr key={index}>
      <td>{Ds.Nom_DS}</td>
      <td>{Ds.Classe}</td>
      <td>{Ds.Date}</td>
      <td><input
            type="checkbox"
            checked={selectedIndex == index}
            onChange={() => handleSingleCheckboxChange(index)}
          />
      </td>
    </tr>
  );
})
        ) : (
          <tr>
            <td colSpan="4">Aucun DS disponible</td>
          </tr>
        )}
        </tbody>
      </table>
      <br/>
      {afficherTableau && (
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Note</th>
        </tr>
      </thead>
      <tbody>
        {Classe.length > 0 ? (
          Classe.map((classe, index) => (
            <tr key={index}>
              <td>{classe.Nom}</td>
              <td>{classe.Prenom}</td>
              <td>{classe.Note}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Aucun élève noté</td>
          </tr>
        )}
      </tbody>
    </table>
    <br />
    <Bouton1 cliquer={cliquer2} />
  </div>
)}
      <br />
      <Bouton cliquer={cliquer} />
    </div>
  );
}

export default Prof;
