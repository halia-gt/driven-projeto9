import "../assets/css/form.css";

export default function Form() {
    return (
        <form>
            <label for="name">Nome do comprador:</label>
            <input type="text" name="name" placeholder="Digite seu nome..." />
            <label for="cpf">CPF do comprador:</label>
            <input type="text" name="cpf" placeholder="Digite seu cpf..." />
        </form>
    );
}