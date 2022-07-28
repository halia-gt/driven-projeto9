import { cpfMask } from "./common/mask"; 
import Button from "./Button";
import "../assets/css/forms.css";

export default function Forms({document, setDocument, name, setName, handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="forms-container">
                <label htmlFor="name">Nome do comprador:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                    required
                />
                <label htmlFor="cpf">CPF do comprador:</label>
                <input
                    maxLength="14"
                    type="text"
                    name="cpf"
                    placeholder="Digite seu cpf..."
                    value={document}
                    onChange={(e) => {setDocument(cpfMask(e.target.value))}}
                    required
                />
            </div>
            <Button classExtra="main-button margin-top" type="submit">
                Reservar assento(s)
            </Button>
        </form>
    );
}