import './eleves.css'

function Identite(props) {  
    return (
        <div>
            <img src={props.image} alt="Photo d'identité" />
            <p>{props.nom} {props.prenom}</p>
            <p>{props.classe}</p>
        </div>);
}

function TableNotes() {  
    return (
        <table>
            <tr>
                <th>Test</th>
                <th>Date</th>
                <th>Note</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    );
}

function Bouton({ cliquer }) {
    return (<button onClick={cliquer}>Voir plus</button>);
  }

function Eleve() {
    return (
        <>
        <Identite
            image = ''
            nom = 'NOM'
            prenom = 'Prénom'
            classe = 'Classe'/>
        <br />
        <TableNotes />
        <br />
        <Bouton />
        </>
    )
}

export default Eleve