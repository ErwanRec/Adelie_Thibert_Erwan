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
                <th>Matière</th>
                <th columnspan='5' >Notes</th>
                <th>Moyenne</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    );
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
        </>
    )
}

export default Eleve