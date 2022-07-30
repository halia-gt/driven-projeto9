import { Link, useLocation } from "react-router-dom";
import ReturnButton from "./common/ReturnButton";
import "../assets/css/sucess.css";
import Button from "./Button";
import Title from "./Title";

export default function Sucess() {
    const location = useLocation();

    return (
        <section className="sucess">
            <ReturnButton returnTo={`/sessao/${location.state.id}`} />
            <Title classExtra="bold-green">
                Pedido feito com sucesso!
            </Title>
            <div className="sucess-container">
                <div className="sucess-info">
                    <h4>Filme e sessão</h4>
                    <p>{location.state.movie}</p>
                    <p>{location.state.date} - {location.state.time}</p>
                </div>
                <div className="sucess-info">
                    <h4>Ingressos</h4>
                    {location.state.seats.map((seat, index) => (
                        <p key={index}>Assento {seat}</p>
                    ))}
                </div>
                <div className="sucess-info">
                    <h4>Compradores</h4>
                    {location.state.buyers.map((buyer) => (
                        <div className="sucess-info">
                            <p>Nome: {buyer.nome}</p>
                            <p>CPF: {buyer.cpf}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/">
                <div className="button-container">
                    <Button classExtra="main-button">
                        Voltar pra Home
                    </Button>
                </div>
            </Link>
        </section>
    );
}