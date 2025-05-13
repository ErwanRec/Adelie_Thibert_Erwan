import { useState, useEffect } from 'react';
import './prof.css';

// Fonction pour récupérer les données d'un professeur
const fetchProfData = async (Idprof) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Idprof}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Composant pour afficher l'image
function Img({ data }) {
  return (
    <div>
      {data && data.sprites && data.sprites.front_default ? (
        <img src={data.sprites.front_default} alt="Image du professeur" />
      ) : (
        <p>Image non disponible</p>
      )}
    </div>
  );
}

// Composant pour afficher le nom du professeur
function Texte({ data }) {
  return <label>{data ? `${data.name} ${data.firstname}` : 'Nom non disponible'}</label>;
}

// Composant pour afficher la date
function Date({ data }) {
  return <label>{data ? data.date : 'Date non disponible'}</label>;
}

// Composant pour afficher la classe
function Classe({ data }) {
  return <label>{data ? data.classe : 'Classe non disponible'}</label>;
}

// Composant pour afficher un test
function Test({ data }) {
  return <label>{data ? data.test : 'Test non disponible'}</label>;
}

function Nom({ data }) {
  return <label>{data ? data.name : 'Prénom non disponible'}</label>;
}

function Prenom({ data }) {
  return <label>{data ? data.firstname : 'Nom non disponible'}</label>;
}

function Note({ data }) {
  return <label>{data ? data.note : 'Note non disponible'}</label>;
}

function Bouton({ cliquer }) {
  return (<button onClick={cliquer}>Visualiser</button>);
}

// Composant principal qui gère l'affichage des données
function Prof() {

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    setIsChecked2(!event.target.checked);
    setIsChecked3(!event.target.checked);
  };
  const handleChange2 = (event) => {
    setIsChecked(!event.target.checked);
    setIsChecked2(event.target.checked);
    setIsChecked3(!event.target.checked);
  };
  const handleChange3 = (event) => {
    setIsChecked(!event.target.checked);
    setIsChecked2(!event.target.checked);
    setIsChecked3(event.target.checked);
  };

  const cliquer = () => {
    return (
      <div>
        <table>
          <caption>Front-end web developer course 2021</caption>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Nom data={Ideleve1} /></td>
              <td><Prenom data={Ideleve1} /></td>
              <td><Note data={Ideleve1} /></td>
            </tr>
            <tr>
              <td><Nom data={Ideleve2} /></td>
              <td><Prenom data={Ideleve2} /></td>
              <td><Note data={Ideleve2} /></td>
            </tr>
            <tr>
              <td><Nom data={Ideleve3} /></td>
              <td><Prenom data={Ideleve3} /></td>
              <td><Note data={Ideleve3} /></td>
            </tr>
          </tbody>
        </table>
        <br />
        <Bouton cliquer={cliquer2} />
      </div>
    );
  }

  const cliquer2 = () => {
    return (
      <div>
        <p>Bienvenue <Texte data={Idprof} /> :</p>
        <br />
        <Img data={Idprof} />
        <br />
        <table>
          <caption>Front-end web developer course 2021</caption>
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Classe</th>
              <th scope="col">Date</th>
              <th scope="col">Sélectionner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Test data={Idprof1} /></td>
              <td><Classe data={Idprof1} /></td>
              <td><Date data={Idprof1} /></td>
              <td><input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChange}
                  />
              </td>
            </tr>
            <tr>
              <td><Test data={Idprof2} /></td>
              <td><Classe data={Idprof2} /></td>
              <td><Date data={Idprof2} /></td>
              <td><input
                  type="checkbox"
                  checked={isChecked2}
                  onChange={handleChange2}
                  />
              </td>
            </tr>
            <tr>
              <td><Test data={Idprof3} /></td>
              <td><Classe data={Idprof3} /></td>
              <td><Date data={Idprof3} /></td>
              <td><input
                  type="checkbox"
                  checked={isChecked3}
                  onChange={handleChange3}
                  />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <Bouton cliquer={cliquer} />
      </div>
    );
  }

  return (
    <div>
      <p>Bienvenue <Texte data={Idprof} /> :</p>
      <br />
      <Img data={Idprof} />
      <br />
      <table>
        <caption>Front-end web developer course 2021</caption>
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col">Classe</th>
            <th scope="col">Date</th>
            <th scope="col">Sélectionner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Test data={Idprof1} /></td>
            <td><Classe data={Idprof1} /></td>
            <td><Date data={Idprof1} /></td>
            <td><input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                />
            </td>
          </tr>
          <tr>
            <td><Test data={Idprof2} /></td>
            <td><Classe data={Idprof2} /></td>
            <td><Date data={Idprof2} /></td>
            <td><input
                type="checkbox"
                checked={isChecked2}
                onChange={handleChange2}
                />
            </td>
          </tr>
          <tr>
            <td><Test data={Idprof3} /></td>
            <td><Classe data={Idprof3} /></td>
            <td><Date data={Idprof3} /></td>
            <td><input
                type="checkbox"
                checked={isChecked3}
                onChange={handleChange3}
                />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <Bouton cliquer={cliquer} />
    </div>
  );
}

export default Prof;
