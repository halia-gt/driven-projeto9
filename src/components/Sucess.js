import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosReturnLeft } from "react-icons/io";
import "../assets/css/sucess.css";
import Button from "./Button";
import Title from "./Title";

export default function Sucess() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <section className="sucess">
            <IconContext.Provider value={{ color: "#E8833A", size: "2em", className: "react-icon" }}>
                <IoIosReturnLeft onClick={() => { navigate(`/sessao/${location.state.id}`) }} />
            </IconContext.Provider>
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
                    <h4>Comprador</h4>
                    <p>Nome: {location.state.name}</p>
                    <p>CPF: {location.state.cpf}</p>
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