import "../assets/css/forms.css";

export default function Forms() {
    return (
        <form>
            <label htmlFor="name">Nome do comprador:</label>
            <input type="text" name="name" placeholder="Digite seu nome..." />
            <label htmlFor="cpf">CPF do comprador:</label>
            <input type="text" name="cpf" placeholder="Digite seu cpf..." />
        </form>
    );
}