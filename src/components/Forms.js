import { cpfMask } from "./common/mask";
import "../assets/css/forms.css";

export default function Forms({ cpf = '', name = '', seatName, seatsId, setSeatsId }) {
    function updateSeatsId(e) {
        if (e.target.name === 'cpf') {
            setSeatsId(seatsId.map((item) => (
                item.seatName === seatName ? {...item, cpf: cpfMask(e.target.value)} : item
            )));
        } else if (e.target.name === 'name') {
            setSeatsId(seatsId.map((item) => (
                item.seatName === seatName ? {...item, name: e.target.value} : item
            )));
        }
    }

    return (
        <div className="forms-container">
            <h3>Comprador do assento {seatName}:</h3>
            <label htmlFor="name">Nome do comprador:</label>
            <input
                type="text"
                name="name"
                placeholder="Digite seu nome..."
                value={name}
                onChange={updateSeatsId}
                required
            />
            <label htmlFor="cpf">CPF do comprador:</label>
            <input
                maxLength="14"
                type="text"
                name="cpf"
                placeholder="Digite seu cpf..."
                value={cpf}
                onChange={updateSeatsId}
                required
            />
        </div>
    );
}