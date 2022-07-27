import "../assets/css/sucess.css";
import Button from "./Button";
import Title from "./Title";

export default function Sucess() {
    return (
        <section className="sucess">
            <Title classExtra="bold-green">
                Pedido feito com sucesso!
            </Title>
            <div className="sucess-container">
                <div className="sucess-info">
                    <h4>Filme e sessão</h4>
                    <p>Enola Holmes</p>
                    <p>24/06/2021</p>
                </div>
                <div className="sucess-info">
                    <h4>Ingressos</h4>
                    <p>Assento 16</p>
                    <p>Assento 17</p>
                </div>
                <div className="sucess-info">
                    <h4>Comprador</h4>
                    <p>Nome: João da Silva Sauro</p>
                    <p>CPF: 123.456.789-10</p>
                </div>
            </div>
            <Button classExtra="main-button">
                Voltar pra Home
            </Button>
        </section>
    );
}